'use strict';

/**
 * @ngdoc service
 * @name mycsServersApp.db
 * @description
 * # db
 * Factory in the mycsServersApp.
 */
angular.module('mycsServersApp')
  .factory('db', function (Collection) {
    var collections = [
      'servers',
      'users'
    ];

    return Collection.load(collections);
  });