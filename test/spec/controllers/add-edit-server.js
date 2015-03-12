'use strict';

describe('Controller: AddEditServerCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var AddEditServerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddEditServerCtrl = $controller('AddEditServerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
