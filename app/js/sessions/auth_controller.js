'use strict';

module.exports = function(app) {
  app.controller('authController', ['$rootScope', 'RESTResource', '$location', '$routeParams', 'auth', function($rootScope, resource, $location, $routeParams, auth) {

    if ($routeParams.token) {
      auth.setEat($routeParams.token);
    }

    //Clear routeParams
    $location.search('token', null);

    //Update user settings
    if (auth.isSignedIn()) {
      var User = resource('users');
      User.getAll(function(err, data) {
        if (err && err.reset) { return auth.resetEat(); }
        $rootScope.color = {
          red: data.settings.color.red,
          green: data.settings.color.green,
          blue:  data.settings.color.blue
        };
      });
    }

    // Redirect
    $location.path('/cards');

  }]);
};
