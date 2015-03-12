'use strict';

/**
 * @ngdoc service
 * @name mycsServersApp.Collection
 * @description
 * # Collection
 * Factory in the mycsServersApp.
 */
angular.module('mycsServersApp')
  .factory('Collection', function ($q) {

    var storage = navigator.storage || navigator.alsPolyfillStorage,
      prefix = 'collection-';

    function Collection(data) {
      if (_.isArray(data)) {
        this.data = data;
        this.name = undefined;
      } else if (_.isString(data)) {
        this.name = data;
        this.data = undefined;
      }
    }

    Collection.load = function (list) {
      var db = {};
      if (_.isArray(list)) {
        _.forEach(list, function (name) {
          Collection.new(name, db);
        });
      }
      return db;
    };

    Collection.new = function (name, db) {
      var collection = new Collection(name);
      if (_.isObject(db)) {
        db[name] = collection;
      }
      return collection;
    };

    Collection.prototype.store = function (name) {
      var key = prefix + name,
        deferred = $q.defer();

      storage.get(key).then(function (data) {
        if (_.isArray(data)) {
          deferred.resolve(data);
        } else {
          deferred.resolve([]);
        }
      });
      return deferred.promise;
    };

    Collection.prototype.do = function (fn) {
      var deferred = $q.defer(),
        that = this;

      if (_.isArray(this.data)) {
        deferred.resolve(fn.call(this));
      } else {
        this.store(this.name).then(function (data) {
          that.data = data;
          deferred.resolve(fn.call(that));
        });
      }
      return deferred.promise;
    };

    Collection.prototype.find = function (predicate) {
      return this.do(function () {
        return _.filter(this.data, predicate);
      });
    };

    Collection.prototype.findOne = function (predicate) {
      return this.do(function () {
        return _.find(this.data, predicate);
      });
    };

    Collection.prototype.findLast = function (predicate) {
      return this.do(function () {
        return _.findLast(this.data, predicate);
      });
    };

    Collection.prototype.count = function (predicate) {
      return this.do(function () {
        if (_.isObject(predicate)) {
          return _.filter(this.data, predicate).count();
        }
        return this.data.length;
      });
    };

    Collection.prototype.fetch = function () {
      return this.do(function () {
        return this.data;
      });
    };

    Collection.prototype.insert = function (obj) {
      return this.do(function () {
        var id = this.data.push(obj);
        obj.id = id;
        return id;
      });
    };

    Collection.prototype.save = function (name) {
      var deferred = $q.defer(),
        key;

      if (_.isString(name) && name) {
        this.name = name;
      }
      key = prefix + this.name;

      if (_.isArray(this.data)) {
        storage.set(key, this.data).then(deferred.resolve);
      }
      return deferred.promise;
    };

    Collection.prototype.saveAs = function (name) {
      return this.save(name);
    };

    Collection.prototype.remove = function (predicate, justOne) {
      return this.do(function () {
        if (justOne) {
          _.pull(this.data, _.find(this.data, predicate));
        } else {
          return _.remove(this.data, predicate);
        }
      });
    };

    /*
     * db.collection.update({id:1}, {name:'Mehran'});
     * db.collection.update({ isAdmin : null }, {isAdmin:true}, false);
     */
    Collection.prototype.update = function (predicate, obj, justOne) {
      return this.do(function () {
        var filtered,
          dataObj;
        if (justOne === undefined || justOne) {
          dataObj = _.find(this.data, predicate);
          if (dataObj) {
            _.extend(dataObj, obj);
          }
        } else {
          filtered = _.filter(this.data, predicate);
          _.forEach(filtered, function (dataObject) {
            _.extend(dataObject, obj);
          });
        }
      });
    };

    Collection.prototype.findAndModify = function () {
      console.log('Not implemented yet!');
    };

    return Collection;
  });