'use strict';

require('angular/angular');

var hippoApp = angular.module('hippoApp', []);
//services
require('./services/rest_resource')(hippoApp);

//controllers
require('./cards/controllers/cards_controller')(hippoApp);

//directives
