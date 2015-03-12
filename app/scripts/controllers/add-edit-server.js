'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:AddEditServerCtrl
 * @description
 * # AddEditServerCtrl
 * Controller of the mycsServersApp
 */
angular.module('mycsServersApp')
  .controller('AddEditServerCtrl', function ($scope, $rootScope, $location, $routeParams, serversService, availability) {
    var id = $routeParams.id;

    $scope.action = id === 'add' ? 'Add' : 'Update';

    $scope.loadingHealthcheck = false;
    $scope.loadingAvailability = false;

    $scope.changeHealthcheck = function () {
      if ($scope.server && $scope.server.hasHealthcheck) {
        if ($scope.origHealthcheckPath) {
          $scope.server.healthcheckPath = $scope.origHealthcheckPath;
        } else {
          $scope.server.healthcheckPath = '/healthcheck';
        }
      } else {
        $scope.server.healthcheckPath = '';
      }
    };

    function init(server) {
      $scope.server = server;
      $scope.origHealthcheckPath = server.healthcheckPath;
      $scope.changeHealthcheck();
    }

    if (id === 'add') {
      init({});
    } else {
      serversService.findOne({
        id: _.parseInt(id)
      }).then(init);
    }

    $scope.healthcheckUrl = function () {
      if ($scope.server && $scope.server.url && $scope.server.healthcheckPath) {
        return $scope.server.url + $scope.server.healthcheckPath;
      }
    };

    $scope.save = function () {
      serversService.saveOrUpdate($scope.server)
        .then(function () {
          serversService.commit();
          $location.path('/servers');
        });
    };

    $scope.checkAvailability = function () {
      $scope.loadingAvailability = true;
      availability.checkServer($scope.server)
        .then(function () {
          $scope.loadingAvailability = false;
        });
    };

    $scope.healthcheck = function () {
      $scope.loadingHealthcheck = true;
      availability.healthcheck($scope.server, true)
        .then(function (healthInfo) {
          $scope.server.notHealthy = !(healthInfo && healthInfo.database && healthInfo.database.healthy);
          $scope.loadingHealthcheck = false;
        })
        .catch(function () {
          $scope.server.notHealthy = true;
          $scope.loadingHealthcheck = false;
        })
    };
  });