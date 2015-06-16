'use strict';

require('angular/angular');
require('angular-aria/angular-aria');
require('angular-animate/angular-animate');
require('angular-material/angular-material');

var hippoApp = angular.module('hippoApp', ['ngMaterial']);
//services
require('./services/rest_resource')(hippoApp);
require('./services/copy')(hippoApp);

//controllers
require('./cards/controllers/cards_controller')(hippoApp);
require('./menu/controllers/sidenav_controller')(hippoApp);

//directives
require('./cards/directives/card_form_directive')(hippoApp);
