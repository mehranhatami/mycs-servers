'use strict';

describe('Service: availability', function () {

  // load the service's module
  beforeEach(module('mycsServersApp'));

  // instantiate service
  var availability;
  beforeEach(inject(function (_availability_) {
    availability = _availability_;
  }));

  it('availability', function () {
    expect(typeof availability).toBe('object');
  });

  it('availability.check to check actual state of a server', function () {
    expect(typeof availability.check).toBe('function');
  });

  it('availability.checkServer to check the actual state of the server', function () {
    expect(typeof availability.checkServer).toBe('function');
  });

  it('availability.get to get the actual healthcheck json object', function () {
    expect(typeof availability.get).toBe('function');
  });

  it('availability.healthcheck which broadcasts the "modal-show" on the desired scope!', function () {
    expect(typeof availability.healthcheck).toBe('function');
  });
});