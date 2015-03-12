'use strict';

describe('Controller: MainCtrl', function () {
  var objToString = Object.prototype.toString;

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.tasks.length).toBeGreaterThan(3);
    expect(_.isArray(scope.tasks)).toBe(true);
  });
});
