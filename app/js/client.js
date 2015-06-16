'use strict';

require('angular/angular');
require('angular-cookies');
require('angular-route'  );


var hippoApp = angular.module('hippoApp', ['ngRoute', 'ngCookies']);

// Services
require('./shared/auth.js'                    )(hippoApp);

// Controllers
require('./cards/controllers/cards_controller')(hippoApp);

// Directives


// Custom View Routes
hippoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/learn/:token', {
      templateUrl: 'templates/views/card_view.html',
      controller:  'cardsController'
    })
    .when('/login', {
    })
    .when('/', {
      redirectTo: '/login'
    })
    .otherwise({ redirectTo: '/login' });
}]);
