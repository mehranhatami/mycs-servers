'use strict';

describe('Service: db', function () {

  // load the service's module
  beforeEach(module('mycsServersApp'), module('Collection'));

  // instantiate service
  var db,
    Collection;
  beforeEach(inject(function (_db_, _Collection_) {
    db = _db_;
    Collection = _Collection_;
  }));

  it('should do something', function () {
    expect(!!db).toBe(true);
    
    expect(_.isObject(db)).toBe(true);

    expect(_.isObject(db.servers)).toBe(true);
    expect(_.isObject(db.users)).toBe(true);

    expect(db.servers instanceof Collection).toBe(true);
    expect(db.users instanceof Collection).toBe(true);
  });
});