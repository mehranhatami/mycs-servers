'use strict';

/**
 * @ngdoc function
 * @name mycsServersApp.controller:ServersCtrl
 * @description
 * # ServersCtrl
 * Controller of the mycsServersApp
 */
function ServersCtrl($routeParams, $rootScope, serversService, availability) {
  this.parseRouteParams($routeParams);
  this.servers = [];
  this.serversCount = 0;
  this.loadingHealthcheck = {};
  this.loadingAvailability = {};

  this.broadcast = _.bind($rootScope.$broadcast, $rootScope);

  _.extend(this, serversService);
  _.extend(this, availability);

  this.load();
}

ServersCtrl.prototype.parseRouteParams = function ($routeParams) {
  this.filterParams = {};

  if ($routeParams.online) {
    this.filterParams.status = 'Online';
  } else if ($routeParams.offline) {
    this.filterParams.status = 'Offline';
  }

  if ($routeParams.healthy) {
    this.filterParams.notHealthy = false;
  } else if ($routeParams.nothealthy) {
    this.filterParams.notHealthy = true;
  }

  if ($routeParams.healthcheck) {
    this.filterParams.hasHealthcheck = true;
  }
};

ServersCtrl.prototype.load = function () {
  var that = this;
  this.loading = true;

  this.find(this.filterParams)
    .then(function (servers) {
      that.loading = false;
      that.serversCount = servers.length;
      that.servers = servers;
    });
};

ServersCtrl.prototype.checkAll = function () {
  var that = this;
  _.forEach(this.servers, function (server, index) {
    that.checkAvailability(index);
  });
};

ServersCtrl.prototype.checkAvailability = function (index) {
  var that = this;
  this.loadingAvailability[index] = true;
  this.checkServer(this.servers[index])
    .then(function () {
      that.loadingAvailability[index] = false;
    });
};

ServersCtrl.prototype.runHealthcheck = function (index, broadcast) {
  var that = this;
  this.loadingHealthcheck[index] = true;
  this.healthcheck(this.servers[index], broadcast)
    .then(function (healthInfo) {
      var server = that.servers[index];
      server.notHealthy = !(healthInfo && healthInfo.database && healthInfo.database.healthy);
      that.loadingHealthcheck[index] = false;
    });
};
ServersCtrl.prototype.doRemoveServer = function (index) {
  var that = this,
    server = this.servers[index];
  this.remove({
    id: server.id
  }, true).then(function () {
    that.commit();
    that.load();
  });
};
ServersCtrl.prototype.removeServer = function (index) {
  var that = this;
  this.broadcast('confirm-show', {
    message: 'Are you sure? You are about to delete a server.',
    action: function () {
      that.doRemoveServer(index);
      that.broadcast('confirm-hide');
    }
  });
};

angular.module('mycsServersApp')
  .controller('ServersCtrl', ServersCtrl);