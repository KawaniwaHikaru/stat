'use strict';

/**
 * @ngdoc overview
 * @name statFrontendApp
 * @description
 * # statFrontendApp
 *
 * Main module of the application.
 */
angular
    .module('statFrontendApp', [
        'ngRoute',
        // 'jkuri.datepicker',
        'ngFileUpload'
    ])
    // .value("key", "value")
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
