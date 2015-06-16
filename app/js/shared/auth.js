'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', '$location', function($http, $cookies, $location) {

    return {
      setEat: function setEat(eat) {
        $cookies.put('eat', eat);
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
