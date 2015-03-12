'use strict';

describe('Service: Collection', function () {

  // load the service's module
  beforeEach(module('mycsServersApp'));

  // instantiate service
  var Collection;
  beforeEach(inject(function (_Collection_) {
    Collection = _Collection_;
  }));

  it('Collection is a constructor function!', function () {
    expect(typeof Collection).toBe('function');
  });

  it('Collection.new provides a way of instantiating a Collection!', function () {
    var db = {};
    expect(typeof Collection.new).toBe('function');

    Collection.new('tests', db);

    expect(db.tests instanceof Collection).toBe(true);
  });

  it('Collection.load loads collections in db object!', function () {
    expect(typeof Collection.load).toBe('function');

    var db = Collection.load(['forms', 'files']);

    expect(db.forms instanceof Collection).toBe(true);
    expect(db.files instanceof Collection).toBe(true);

  });

  it('Collection provides a solution to use the client storage as a DB!', function () {
    var db = Collection.load(['collection']),
      dbMethods = ['findAndModify', 'update', 'remove', 'saveAs', 'save', 'insert', 'fetch', 'count', 'findLast', 'findOne', 'find', 'do', 'store'];

    expect(_.isObject(db)).toBe(true);
    expect(_.isObject(db.collection)).toBe(true);

    _.forEach(dbMethods, function (methodName) {
      expect(_.isFunction(db.collection[methodName])).toBe(true);
    });
  });
});