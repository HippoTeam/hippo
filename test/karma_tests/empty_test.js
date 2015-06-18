'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('empty service', function() {
  var setEmpty;
  var testobj;

  beforeEach(angular.mock.module('hippoApp'));

  beforeEach(angular.mock.inject(function(_setEmpty_) {
    setEmpty = _setEmpty_;
  }));

  beforeEach(function() {
    testobj = {
      arr: [1,2,3,4,5],
      fun: function() {return 'So Cool';},
      str: 'Hello World'
    };
  });

  it('should make a copy', function() {
    var emptyobj = setEmpty(testobj);
    expect(emptyobj.arr).toBe('');
    expect(emptyobj.fun).toBe('');
    expect(emptyobj.str).toBe('');
    expect(typeof emptyobj.arr).toBe('string');
    expect(typeof emptyobj.fun).toBe('string');
  });

});
