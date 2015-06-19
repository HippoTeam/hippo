'use strict';

module.exports = function(app) {
  app.controller('authController', ['$location', '$routeParams', 'auth', function($location, $routeParams, auth) {

    if ($routeParams.token) {
      auth.setEat($routeParams.token);
    }
    //Clear routeParams
    $location.search('token', null);
    // Redirect
    $location.path('/cards');

  }]);
};
