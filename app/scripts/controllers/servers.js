'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:ServersCtrl
 * @description
 * # ServersCtrl
 * Controller of the mycsServersApp
 */
angular.module('mycsServersApp')
  .controller('ServersCtrl', function ($scope, serversService, availability) {
    $scope.servers = [];
    $scope.serversCount = 0;

    $scope.load = function () {
      $scope.loading = true;

      serversService.find().then(function (servers) {
        $scope.loading = false;
        $scope.serversCount = servers.length;
        $scope.servers = servers;
      });
    };

    $scope.healthcheck = function (id) {
      serversService.findOne({
        id: id
      }).then(function (server) {
        availability.healthcheck($scope, server);
      });
    };

    $scope.load();
  });