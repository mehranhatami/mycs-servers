'use strict';

describe('Directive: confirmModal', function () {

  // load the directive's module
  beforeEach(module('mycsServersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<confirm-modal></confirm-modal>');
    element = $compile(element)(scope);
    expect(element.is('confirm-modal')).toBe(true);
  }));
});
