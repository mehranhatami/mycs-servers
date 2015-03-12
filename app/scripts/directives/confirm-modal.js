'use strict';

/**
 * @ngdoc directive
 * @name mycsServersApp.directive:confirmModal
 * @description
 * # confirmModal
 */
angular.module('mycsServersApp')
  .directive('confirmModal', function () {
    return {
      templateUrl: 'scripts/directives/confirm-modal.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var confirmModal =  element.find('>.confirm-modal');
        scope.$on('confirm-show', function (event, data) {
          scope.data = data;
          confirmModal.modal('show');
        });

        scope.$on('confirm-hide', function () {
          confirmModal.modal('hide');
        });
      }
    };
  });
