'use strict';

module.exports = function(app) {
  app.controller('sidenavController', ['$scope', 'mdSidenav', 'auth', function($scope, $mdSidenav, auth) {

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.logout = function() {
      auth.logout();
    };
  }]);
};
