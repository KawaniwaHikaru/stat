'use strict';

/**
 * @ngdoc function
 * @name statFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statFrontendApp
 */
angular.module('statFrontendApp')
  .controller('MainCtrl', function ($scope, statAPI) {
    $scope.me = null;
    //
    // statAPI.getMe().then((data) => {
    //   console.log(data);
    //   $scope.me = data
    //   $scope.$apply();
    // });

    statAPI.query().then(results => {
      $scope.results = results;
    });


  });
