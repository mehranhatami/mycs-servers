'use strict';

/**
 * @ngdoc service
 * @name mycsServersApp.availability
 * @description
 * # availability
 * Factory in the mycsServersApp.
 */
angular.module('mycsServersApp')
  .factory('availability', function ($rootScope, $http, $q) {

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
      $.get(server.url + server.healthcheckPath)
        .success(dfd.resolve)
        .error(dfd.reject);
      return dfd.promise;
    }

    /**
     * The availability exposes 3 important functions:
     * availability.check(..)
     * availability.checkServer(..)
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
       * @param {Object} A Mycs Server url like: http://54.154.87.59
       * @returns {Promise} Returns a promise which will be resolved with the actual state of the server.
       */
      check: function check(url) {
        var dfd = $q.defer();
        // We better not to use XHR to prevent CORS exceptions that's why getScript is much wiser alternative
        $.getScript(url)
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
       * This checks for the availability and updates the status
       *
       * @public
       * @param {Object} A Mycs Server object
       * @returns {Promise} Returns a promise which will be resolved with the actual status value.
       */
      checkServer: function (server) {
        return availability.check(server.url)
          .then(function (status) {
            server.status = status;
          })
          .catch(function () {
            server.status = 'Unknown';
          });
      },

      /**
       * Checks the availability of the server before sending a xhr request for getting the health info.
       *
       * @public
       * @param {Object} A Mycs Server object
       * @returns {Promise} Returns a promise which will be resolved with the health info json.
       */
      get: function get(server) {
        return availability.check(server.url)
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
       * @param {Object} A Mycs Server object
       */
      healthcheck: function (server, broadcast) {
        return availability.get(server)
          .then(function (healthInfo) {
            if (broadcast) {
              $rootScope.$broadcast('modal-show', healthInfo);
            }
            return healthInfo;
          })
          .catch(function (err) {
            if (broadcast) {
              $rootScope.$broadcast('modal-show', {
                ping: 'Not healthy!!!!',
                database: {
                  healthy: false
                }
              });
            }
            return err;
          });
      }
    };

    return availability;
  });