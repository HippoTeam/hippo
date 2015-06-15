'use strict';

require('angular/angular');

var hippoApp = angular.module('hippoApp', []);

require('./cards/controllers/cards_controller')(hippoApp);
