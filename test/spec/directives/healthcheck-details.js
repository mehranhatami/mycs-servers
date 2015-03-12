'use strict';

describe('Directive: healthcheckDetails', function () {

  // load the directive's module
  beforeEach(module('mycsServersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<healthcheck-details></healthcheck-details>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the healthcheckDetails directive');
  // }));
});
