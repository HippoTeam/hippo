'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('auth service', function() {
  var auth;
  var $cookies;
  var $location;

  beforeEach(angular.mock.module('hippoApp'));

  beforeEach(angular.mock.inject(function(_auth_, _$cookies_, _$location_) {
    auth = _auth_;
    $cookies = _$cookies_;
    $location = _$location_;
  }));

  it('should verify user is not signed in', function() {
    $cookies.put('eat', '');
    expect(auth.isSignedIn()).toBe(false);
  });

  it('should verify user is signed in', function() {
    $cookies.put('eat', 'qwerty12');
    expect(auth.isSignedIn()).toBe(true);
  });

  it('should get eat token', function() {
    $cookies.put('eat', 'qwerty123');
    expect(auth.getEat()).toBe('qwerty123');
  });

  it('should set eat token', function() {
    auth.setEat('qwerty1234');
    expect($cookies.get('eat')).toBe('qwerty1234');
  });

  it('should reset eat token', function() {
    $cookies.put('eat', 'qwerty12345');
    $location.path('/cards');
    auth.resetEat();
    expect($cookies.get('eat')).toBe('');
    expect($location.path()).toBe('/login');
  });

  it('should logout', function() {
    $cookies.put('eat', 'qwerty123456');
    $location.path('/cards2');
    auth.logout();
    expect($cookies.get('eat')).toBe('');
    expect($location.path()).toBe('/login');
  });

});
