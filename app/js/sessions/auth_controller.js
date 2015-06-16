'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
    if(auth.isSignedIn()) { $location.path('/learn'); }

    $scope.errors = [];
  }]);
};
