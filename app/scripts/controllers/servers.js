'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:ServersCtrl
 * @description
 * # ServersCtrl
 * Controller of the mycsServersApp
 */
angular.module('mycsServersApp')
  .controller('ServersCtrl', function ($scope, $routeParams, $rootScope, serversService, availability) {
    var filterParams = {};

    if ($routeParams.online) {
      filterParams.status = 'Online';
    } else if ($routeParams.offline) {
      filterParams.status = 'Offline';
    }

    if ($routeParams.healthy) {
      filterParams.notHealthy = false;
    } else if ($routeParams.nothealthy) {
      filterParams.notHealthy = true;
    }

    if ($routeParams.healthcheck) {
      filterParams.hasHealthcheck = true;
    }

    $scope.servers = [];
    $scope.serversCount = 0;
    $scope.loadingHealthcheck = {};
    $scope.loadingAvailability = {};

    $scope.load = function () {
      $scope.loading = true;

      serversService.find(filterParams).then(function (servers) {
        $scope.loading = false;
        $scope.serversCount = servers.length;
        $scope.servers = servers;
      });
    };

    $scope.checkAll = function () {
      _.forEach($scope.servers, function (server, index) {
        $scope.checkAvailability(index);
      });
    };

    $scope.checkAvailability = function (index) {
      $scope.loadingAvailability[index] = true;
      availability.checkServer($scope.servers[index])
        .then(function () {
          $scope.loadingAvailability[index] = false;
        });
    };

    $scope.healthcheck = function (index, broadcast) {
      $scope.loadingHealthcheck[index] = true;
      availability.healthcheck($scope.servers[index], broadcast)
        .then(function (healthInfo) {
          var server = $scope.servers[index];
          server.notHealthy = !(healthInfo && healthInfo.database && healthInfo.database.healthy);
          $scope.loadingHealthcheck[index] = false;
        });
    };

    function doRemove(index) {
      var server = $scope.servers[index];
      serversService.remove({
        id: server.id
      }, true).then(function () {
        serversService.commit();
        $scope.load();
      });
    }

    $scope.remove = function (index) {
      $rootScope.$broadcast('confirm-show', {
        message: 'Are you sure? You are about to delete a server.',
        action: function () {
          doRemove(index);
          $rootScope.$broadcast('confirm-hide');
        }
      });
    };

    $scope.load();
  });