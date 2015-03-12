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

    if (id === 'add') {
      $scope.server = {
        healthcheckPath: '/healthcheck'
      };
    } else {
      this.findOne({
        id: _.parseInt(id)
      }).then(function (server) {
        $scope.server = server;
      });
    }

    $scope.save = function () {
      serversService.saveOrUpdate($scope.server)
        .then(function () {
          serversService.commit();
          $location.path('/servers');
        });
    };

    $scope.checkAvailability = function () {
      availability.check($scope.server)
        .then(function (status) {
          $scope.server.status = status;
        })
        .catch(function () {
          $scope.server.status = 'Unknown';
        });
    };

    $scope.healthcheck = function () {
      availability.healthcheck($scope, $scope.server);
    };
  });