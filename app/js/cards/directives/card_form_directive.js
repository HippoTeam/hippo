'use strict';

module.exports = function(app) {
  app.directive('cardFormDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/card_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        card: '='
      },
      transclude: true
    };
  });
};
