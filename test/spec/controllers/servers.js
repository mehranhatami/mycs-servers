'use strict';

describe('Controller: ServersCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var ServersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = $controller('ServersCtrl');
  }));

  it('scope.load is a function', function () {
    expect(_.isFunction(scope.load)).toBe(true);
  });

  it('scope.checkAll is a global ServersCtrl function', function () {
    expect(_.isFunction(scope.checkAll)).toBe(true);
  });

  it('scope.checkAvailability is a global ServersCtrl function', function () {
    expect(_.isFunction(scope.checkAvailability)).toBe(true);
  });

  it('scope.healthcheck is a global ServersCtrl function', function () {
    expect(_.isFunction(scope.healthcheck)).toBe(true);
  });

  it('scope.remove is a global ServersCtrl function', function () {
    expect(_.isFunction(scope.remove)).toBe(true);
  });
});
