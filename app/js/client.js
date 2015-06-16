'use strict';

require('angular/angular');

var hippoApp = angular.module('hippoApp', []);
//services
require('./services/rest_resource')(hippoApp);
require('./services/copy')(hippoApp);
require('./services/set_empty')(hippoApp);

//controllers
require('./cards/controllers/cards_controller')(hippoApp);

//directives
require('./cards/directives/card_form_directive')(hippoApp);
