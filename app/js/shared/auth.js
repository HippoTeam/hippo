'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$base64', '$cookies', function($http, $base64, $cookies) {

    var authSuccessHandler = function(callback) {
      return function(data) {
        $cookies.put('eat', data.eat);
        callback(null, data);
      };
    };

    var authErrorHandler = function(callback) {
      return function(err) {
        callback(err, null);
      };
    };


    return {
      login: function login(callback) {
        $http.get('/auth/facebook')
          .success(authSuccessHandler(callback))
          .error(authErrorHandler(callback));
      },

      isSignedIn: function isSignedIn() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      },

      logout: function logout() {
        $cookies.put('eat', '');
      }
    };
  }]);
};
