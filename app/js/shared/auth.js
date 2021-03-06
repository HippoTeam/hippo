'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', '$location', function($http, $cookies, $location) {

    return {

      isSignedIn: function isSignedIn() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      },

      getEat: function getEat() {
        // Load cookies for requests
        return $cookies.get('eat');
      },

      setEat: function setEat(eat) {
        $cookies.put('eat', eat);
      },

      resetEat: function resetEat() {
        this.logout();
      },

      logout: function logout() {
        $cookies.put('eat', '' );
        $location.path('/login');
      }
    };
  }]);
};
