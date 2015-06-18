'use strict';

var expect = require('chai').expect;
var randomArrayElements = require('../lib/randomArrayElements');

describe('randomArrayElements function', function() {
  var array = [];
  beforeEach(function() {
    array = [0,1,2,3,4,5,6,7,8,9];
  })

  it('should return a random set of values', function() {
    var randomArray = randomArrayElements(array, 4);
    expect(randomArray.length).to.eql(4);
    expect(randomArray[2]<10).to.eql(true);
    expect(Array.isArray(randomArray)).to.eql(true);
  });

  it('should return the original array randomized if num is too high', function() {
    var randomArray = randomArrayElements(array, 15);
    expect(randomArray.length).to.eql(10);
    expect(Array.isArray(randomArray)).to.eql(true);
  });

  it('should return the original array randomized if no num is provided', function() {
    var randomArray = randomArrayElements(array);
    expect(randomArray.length).to.eql(10);
    expect(Array.isArray(randomArray)).to.eql(true);
  });
});
