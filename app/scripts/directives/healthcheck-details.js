'use strict';

/**
 * @ngdoc directive
 * @name mycsServersApp.directive:healthcheckDetails
 * @description
 * # healthcheckDetails
 */
angular.module('mycsServersApp')
  .directive('healthcheckDetails', function () {
    return {
      templateUrl: 'scripts/directives/healthcheck-details.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        var healthModal = element.find('>.healthcheck-modal');
        scope.$on('modal-show', function (event, data) {
          scope.data = data;
          healthModal.modal('show');
        });
      }
    };
  });