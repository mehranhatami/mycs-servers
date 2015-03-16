'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = $controller('AboutCtrl');
  }));

  it('The initial setup works for testing', function () {
    expect(_.isFunction(scope.load)).toBe(true);
  });
});