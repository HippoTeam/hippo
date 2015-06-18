'use strict';

require('angular/angular'                  );
require('angular-aria/angular-aria'        );
require('angular-animate/angular-animate'  );
require('angular-cookies'                  );
require('angular-material/angular-material');
require('angular-route'                    );

var hippoApp = angular.module('hippoApp', ['ngRoute', 'ngCookies', 'ngMaterial']);


// Services
require('./shared/auth.js'        )(hippoApp);
require('./services/rest_resource')(hippoApp);
require('./services/copy'         )(hippoApp);
require('./services/set_empty'    )(hippoApp);

// Controllers
require('./cards/controllers/cards_controller' )(hippoApp);
require('./menu/controllers/sidenav_controller')(hippoApp);
require('./sessions/auth_controller')(hippoApp);

// Directives
require('./cards/directives/card_form_directive')(hippoApp);


// Custom View Routes
hippoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'templates/views/sign_in.html'
    })
    .when('/auth', {
      templateUrl: 'templates/views/auth_view.html'
    })
    .when('/cards', {
      templateUrl: 'templates/views/card_view.html'
    })
    .when('/cards2', {
      templateUrl: 'templates/views/card_view2.html'
    })
    .when('/about_us', {
      templateUrl: 'templates/views/about_us.html'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
