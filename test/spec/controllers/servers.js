'use strict';

describe('Controller: ServersCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var ServersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServersCtrl = $controller('ServersCtrl', {
      $scope: scope
    });
  }));

  // load

  it('scope.load is a function', function () {
    expect(_.isFunction(scope.load)).toBe(true);
  });
});
