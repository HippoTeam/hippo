'use strict';

module.exports = function(app) {
  app.factory('setEmpty', function() {
    return function(objToEmpty) {
      Object.keys(objToEmpty).forEach(function(key) {
        objToEmpty[key] = '';
      });
      return objToEmpty;
    };
  });
};
