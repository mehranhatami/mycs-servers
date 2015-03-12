'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('The initial setup works for testing', function () {
    expect(_.isFunction(scope.load)).toBe(true);
  });
});
