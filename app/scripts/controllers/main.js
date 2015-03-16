'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mycsServersApp
 */
function MainCtrl() {
  this.tasks = [
    'Add, modify or remove a server.',
    'Display a list of all servers and their statuses.',
    'Tests are welcome.',
    'Code (ideally on a github/bitbucket account).',
    'Tools to easily setup/start the project: grunt.',
    'Documentation',
    'Inline code comments'
  ];
}
angular.module('mycsServersApp')
  .controller('MainCtrl', MainCtrl);