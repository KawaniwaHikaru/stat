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
    'ngRoute'
    ])
  // .value("key", "value")
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'uploadCtrl',
        controllerAs: 'upload'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
