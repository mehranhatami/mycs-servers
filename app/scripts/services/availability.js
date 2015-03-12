'use strict';

/**
 * @ngdoc service
 * @name mycsServersApp.availability
 * @description
 * # availability
 * Factory in the mycsServersApp.
 */
angular.module('mycsServersApp')
  .factory('availability', function ($http, $q) {

    /**
     * this will get the healthcheck json object from the server
     * and also resolve the promise value with it.
     *
     * @private
     * @param {Object} A Mycs Server object
     * @returns {Promise} Returns a promise which will be resolved with the actual json object or an error.
     */
    function getHealthInfo(server) {
      var dfd = $q.defer();
      // We should first check the availability of the server because of CORS filters
      // And that's why we don't expose the getHealthInfo function
      $.getJSON(server.url + server.healthcheckPath)
        .success(function (info) {
          dfd.resolve(info);
        })
        .error(function (err) {
          dfd.reject(err);
        });
      return dfd.promise;
    }

    /**
     * The availability object exposes 3 important functions:
     * availability.check(..)
     * availability.get(..)
     * availability.healthcheck(..)
     *
     * @public
     */
    var availability = {

      /**
       * To check if Online or Offline
       * this could become much more fancier.
       *
       * @public
       * @param {Object} A Mycs Server object
       * @returns {Promise} Returns a promise which will be resolved with the actual state of the server.
       */
      check: function check(server) {
        var dfd = $q.defer();
        // We better not to use XHR to prevent CORS exceptions that's why getScript is much wiser alternative
        $.getScript(server.url)
          .success(function () {
            // TODO: check for more advanced availability stuff
            // We could check status value which should be 200 in successful operations
            // We could also check response headers
            dfd.resolve('Online');
          })
          .error(function () {
            dfd.resolve('Offline');
          });
        return dfd.promise;
      },

      /**
       * Checks the availability of the server before sending a xhr request for getting the health info.
       *
       * @public
       * @param {Object} A Mycs Server object
       * @returns {Promise} Returns a promise which will be resolved with the health info json.
       */
      get: function get(server) {
        return availability.check(server)
          .then(function (status) {
            if (status === 'Online') {
              return getHealthInfo(server);
            }
          });
      },

      /**
       * Starts of the whole healthcheck story and eventually displays the healthcheck model
       *
       * @public
       * @param {Object} A $scope object which is passed when you need to open up the healthcheck modal
       * @param {Object} A Mycs Server object
       */
      healthcheck: function ($scope, server) {
        availability.get(server)
          .then(function (healthInfo) {
            $scope.$broadcast('modal-show', healthInfo);
          })
          .catch(function () {
            $scope.$broadcast('modal-show', {
              ping: 'Server is not healthy'
            });
          });
      }
    };

    return availability;
  });