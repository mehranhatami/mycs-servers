'use strict';

/**
 * @ngdoc overview
 * @name mycsServersApp
 * @description
 * # mycsServersApp
 *
 * Main module of the application.
 */
angular
  .module('mycsServersApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/servers', {
        templateUrl: 'views/servers.html',
        controller: 'ServersCtrl'
      })
      .when('/servers/:id', {
        templateUrl: 'views/addEdit.html',
        controller: 'AddEditServerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
