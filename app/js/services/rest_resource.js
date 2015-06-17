'use strict';

module.exports = function(app) {
  var handleError = function(callback) {
    return function(err) {
      console.log(err);
      callback(err, null);
    };
  };

  var handleSuccess = function(callback) {
    return function(data) {
      callback(null, data);
    };
  };

  app.factory('RESTResource', ['$http', 'auth', function($http, auth) {
    return function(resourceName) {

      // Set header with cookie
      var eat = auth.getEat();
      $http.defaults.headers.common.eat = eat;

      return {
        getAll: function(callback) {
          $http.get('/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        create: function(resourceData, callback) {
          $http.post('/' + resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(resourceData, callback) {
          $http.put('/' + resourceName + '/' + resourceData._id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        update: function(resourceData, callback) {
          $http.patch('/' + resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(resourceData, callback) {
          $http.delete('/' + resourceName + '/' + resourceData._id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
