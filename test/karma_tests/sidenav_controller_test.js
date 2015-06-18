'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('sidenav controller', function() {
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('hippoApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new sidenav controller', function() {
    var sidenavController = $ControllerConstructor('sidenavController', {$scope: $scope});
    expect(typeof sidenavController).toBe('object');
    expect(typeof $scope.openLeftMenu).toBe('function');
    expect(typeof $scope.isSignedIn).toBe('function');
    expect(typeof $scope.isSignedOut).toBe('function');
    expect(typeof $scope.logout).toBe('function');
  });

});


