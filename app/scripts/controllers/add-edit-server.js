'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:AddEditServerCtrl
 * @description
 * # AddEditServerCtrl
 * Controller of the mycsServersApp
 */
function AddEditServerCtrl($location, $routeParams, serversService, availability) {
  var id = $routeParams.id;

  this.action = id === 'add' ? 'Add' : 'Update';
  this.loadingHealthcheck = false;
  this.loadingAvailability = false;

  this.goToServers = _.bind($location.path, $location, '/servers');

  if (id === 'add') {
    this.init({});
  } else if (!_.isNaN(_.parseInt(id))) {
    serversService.findOne({
      id: _.parseInt(id)
    }).then(_.bind(this.init, this));
  } else {
    this.goToServers();
  }

  //Utilities
  _.extend(this, serversService);
  _.extend(this, availability);
}

AddEditServerCtrl.prototype.init = function (server) {
  this.server = server;
  this.origHealthcheckPath = server.healthcheckPath;
  this.changeHealthcheck();
};

AddEditServerCtrl.prototype.changeHealthcheck = function () {
  if (this.server && this.server.hasHealthcheck) {
    if (this.origHealthcheckPath) {
      this.server.healthcheckPath = this.origHealthcheckPath;
    } else {
      this.server.healthcheckPath = '/healthcheck';
    }
  } else {
    this.server.healthcheckPath = '';
  }
};

AddEditServerCtrl.prototype.healthcheckUrl = function () {
  if (this.server && this.server.url && this.server.healthcheckPath) {
    return this.server.url + this.server.healthcheckPath;
  }
};

AddEditServerCtrl.prototype.save = function () {
  var that = this;
  this.saveOrUpdate(this.server)
    .then(function () {
      that.commit();
      that.goToServers();
    });
};

AddEditServerCtrl.prototype.checkAvailability = function () {
  var that = this;
  this.loadingAvailability = true;
  this.checkServer(this.server)
    .then(function () {
      that.loadingAvailability = false;
    });
};

AddEditServerCtrl.prototype.runHealthcheck = function () {
  var that = this;
  this.loadingHealthcheck = true;
  this.healthcheck(this.server, true)
    .then(function (healthInfo) {
      that.server.notHealthy = !(healthInfo && healthInfo.database && healthInfo.database.healthy);
      that.loadingHealthcheck = false;
    })
    .catch(function () {
      that.server.notHealthy = true;
      that.loadingHealthcheck = false;
    });
};

angular.module('mycsServersApp')
  .controller('AddEditServerCtrl', AddEditServerCtrl);