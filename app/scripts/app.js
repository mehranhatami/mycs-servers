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
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/servers', {
        templateUrl: 'views/servers.html'
      })
      .when('/servers/:id', {
        templateUrl: 'views/addEdit.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });