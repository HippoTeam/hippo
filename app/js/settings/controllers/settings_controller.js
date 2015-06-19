'use strict';

module.exports = function(app) {
  app.controller('settingsController',  ['$http', 'RESTResource', 'auth', '$scope', '$rootScope', '$mdToast', function($http, resource, auth, $scope, $rootScope, $mdToast ) {

    var User = resource('users');

    $scope.getSettings = function() {
      User.getAll(function(err, data) {
        if (err && err.reset) { return auth.resetEat(); }
        $scope.settings = data.settings;
        updateRootScopeColor();
      });
    };

    function updateRootScopeColor() {
      $rootScope.color = {
        red: $scope.settings.color.red,
        green: $scope.settings.color.green,
        blue:  $scope.settings.color.blue
      };
    }

    $scope.updateSettings = function() {
      updateRootScopeColor();
      User.update($scope.settings, function(err, data) {
        if (err && err.reset) { return auth.resetEat(); }
        if (err) {
          return $mdToast.show({
            parent: 'main',
            template: '<md-toast class="md-toast incorrect">Error: Could not save settings</md-toast>',
            hideDelay: 1000,
            position: 'bottom left'
          });
        }
        return $mdToast.show({
          parent: 'main',
          template: '<md-toast class="md-toast correct">Settings saved!</md-toast>',
          hideDelay: 1000,
          position: 'bottom left'
        });
      });
    };

    $scope.funMeter = function() {
      User.update($scope.settings, function(err, data) {
        if (err && err.reset) { return auth.resetEat(); }
      });
      if($scope.settings.fun_meter < 777) {
        $mdToast.show({
          parent: 'main',
          template: '<md-toast class="md-toast incorrect">' + 'Error: Need moar fun!</md-toast>',
          hideDelay: 1000,
          position: 'bottom left'
          });
      } else if($scope.settings.fun_meter > 777) {
        $mdToast.show({
          parent: 'main',
          template: '<md-toast class="md-toast incorrect">' + 'Error: Too much fun to handle!</md-toast>',
          hideDelay: 1000,
          position: 'bottom left'
          });
      } else {
        $mdToast.show({
          parent: 'main',
          template: '<md-toast class="md-toast correct">' + 'Aww Yiss~ 777!</md-toast>',
          hideDelay: 1000,
          position: 'bottom left'
          });
      }
    };
  }]);
};
