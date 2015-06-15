'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
    if(auth.isSignedIn()) { $location.path('/learn'); }

    $scope.errors = [];

    $scope.login = function() {
      auth.signin(function(err, data) {
        console.log("HERE IS THE DATA THAT CAME BACK FROM SERVER: ", data, " OR ERROR: ", err);

        if (err) {
          console.log('Error signing in. Error: ', err);
          return $scope.errors.push({error: true, msg: 'error signing in'})
        }

        $location.path('/learn')
      });
    };
  }]);
};
