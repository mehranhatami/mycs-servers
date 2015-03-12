'use strict';

describe('Controller: AddEditServerCtrl', function () {

  // load the controller's module
  beforeEach(module('mycsServersApp'));

  var AddEditServerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.id = '1';
    AddEditServerCtrl = $controller('AddEditServerCtrl', {
      $scope: scope
    });
  }));

  // it('should do some tests', function () {
  //   expect(true).toBe(true);
  // });
});
