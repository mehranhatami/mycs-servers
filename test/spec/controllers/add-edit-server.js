'use strict';

describe('Controller: AddEditServerCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var AddEditServerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = $controller('AddEditServerCtrl');
  }));

  it('AddEditServerCtrl is responsible for adding and editing servers', function () {
    expect(AddEditServerCtrl).not.toBe(null);
  });

  it('scope.changeHealthcheck serves as a global method', function () {
    expect(typeof scope.changeHealthcheck).toBe('function');
  });

  it('scope.healthcheckUrl serves as a global method', function () {
    expect(typeof scope.healthcheckUrl).toBe('function');
  });

  it('scope.save serves as a global method', function () {
    expect(typeof scope.save).toBe('function');
  });

  it('scope.checkAvailability serves as a global method', function () {
    expect(typeof scope.checkAvailability).toBe('function');
  });

  it('scope.healthcheck serves as a global method', function () {
    expect(typeof scope.healthcheck).toBe('function');
  });
});