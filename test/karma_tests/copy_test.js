'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('copy service', function() {
  var copy;
  var testobj;

  beforeEach(angular.mock.module('hippoApp'));

  beforeEach(angular.mock.inject(function(_copy_) {
    copy = _copy_;
  }));

  beforeEach(function() {
    testobj = {
      arr: [1,2,3,4,5],
      fun: function() {return 'So Cool';},
      str: 'Hello World'
    };
  });

  it('should make a copy', function() {
    var copyofobj = copy(testobj);
    expect(Array.isArray(copyofobj.arr)).toBe(true);
    expect(typeof copyofobj.fun).toBe('function');
    expect(copyofobj.str).toBe('Hello World');
  });

});
