'use strict';

module.exports = function(app) {
  app.controller('sidenavController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
  });
};
