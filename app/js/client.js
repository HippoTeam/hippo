'use strict';

require('angular/angular');
require('angular-route'  );

var hippoApp = angular.module('hippoApp', ['ngRoute']);

// Services


// Controllers
require('./cards/controllers/cards_controller')(hippoApp);

// Directives


// Custom View Routes
hippoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/learn', {
      templateUrl: 'templates/views/card_view.html',
      controller:  'cards_controller'
    })
    .when('/login', {
      templateUrl: 'templates/views/login_view.html',
      controller:  'authController'
    })
    .when('/', {
      redirectTo: '/login'
    })
    .otherwise({ redirectTo: '/login' });
}]);
