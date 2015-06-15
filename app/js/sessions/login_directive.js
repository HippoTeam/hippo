'use strict';

module.exports = function() {
  app.directive('loginDirective', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: './sessions/login_directive.html'
    };
  });
};
