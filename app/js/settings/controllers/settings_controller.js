'use strict';

module.exports = function(app) {
  app.controller('settingsController',  ['$http', '$scope', '$rootScope', '$mdToast', '$animate', function($http, $scope, $rootScope, $mdToast, $animate ) {
    // $rootScope.color = {
    // red: 63,
    // green: 81,
    // blue: 181
    // };
    // $scope.choices = 10;
    // $scope.personFilter = 65;
    // $scope.fun = 0;

    $scope.changeColor = function() {
      $rootScope.color = {
      red: $scope.color.red,
      green: $scope.color.green,
      blue:  $scope.color.blue
      };
    };

    $scope.changeChoices = function() {
      $http.patch('/users/settings', {numButtons: $scope.choices})
        .success(function(data) {
          $mdToast.show({
            parent: 'main',
            template: '<md-toast class="md-toast correct">' + 'Successfully changed number of choices to ' + $scope.choices + '!</md-toast>',
            hideDelay: 1000,
            position: 'bottom left'
            });
        })
        .error(function(data) {
          $mdToast.show({
            parent: 'main',
            template: '<md-toast class="md-toast correct">Could not save settings</md-toast>',
            hideDelay: 1000,
            position: 'bottom left'
          });
        });
    };

    $scope.changePersonFilter = function() {
      $mdToast.show({
        parent: 'main',
        template: '<md-toast class="md-toast correct">' + 'Successfully change person filter to ' + $scope.personFilter + '!</md-toast>',
        hideDelay: 1000,
        position: 'bottom left'
        });
    };

    $scope.funMeter = function() {
      if($scope.fun < 777) {
        $mdToast.show({
          parent: 'main',
          template: '<md-toast class="md-toast incorrect">' + 'Error: Need moar fun!</md-toast>',
          hideDelay: 1000,
          position: 'bottom left'
          });
      } else if($scope.fun > 777) {
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
