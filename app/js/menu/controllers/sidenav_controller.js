'use strict';

module.exports = function(app) {
  app.controller('sidenavController', ['$scope', '$mdSidenav', 'auth', function($scope, $mdSidenav, auth) {

    $scope.openLeftMenu = function openLeftMenu() {
      $mdSidenav('left').toggle();
    };

    $scope.isSignedIn = function isSignedOut() {
      return auth.isSignedIn();
    };

    $scope.isSignedOut = function isSignedOut() {
      return !auth.isSignedIn();
    };

    $scope.logout = function logout() {
      auth.logout();
    };
  }]);
};
