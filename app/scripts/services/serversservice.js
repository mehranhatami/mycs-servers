'use strict';

/**
 * @ngdoc service
 * @name mycsServersApp.serversService
 * @description
 * # serversService
 * Factory in the mycsServersApp.
 */
angular.module('mycsServersApp')
  .factory('serversService', function (db) {
    var serversService = {
      count: function (predicate) {
        return db.servers.count(predicate);
      },
      find: function (predicate) {
        return db.servers.find(predicate);
      },
      findOne: function (predicate) {
        return db.servers.findOne(predicate);
      },
      remove: function (predicate, justOne) {
        return db.servers.remove(predicate, justOne);
      },
      save: function (newServer) {
        return db.servers.insert(newServer);
      },
      update: function (predicate, server) {
        return db.servers.update(predicate, server);
      },
      saveOrUpdate: function (server) {
        if (typeof server.id === 'number') {
          return serversService.update({
            id: server.id
          }, server);
        } else {
          return serversService.save(server);
        }
      },
      commit: function () {
        return db.servers.save();
      }
    };
    return serversService;
  });