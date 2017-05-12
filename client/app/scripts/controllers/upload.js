'use strict';

/**
 * @ngdoc function
 * @name picaticFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the picaticFrontendApp
 */
angular.module('picaticFrontendApp')
  .controller('EventCtrl', function ($routeParams, $scope, PicaticAPI) {

    // $scope.eventId = $routeParams.eventId;
    //
    //  console.log($routeParams);
    PicaticAPI.getEvent($routeParams.eventId)
      .then(event => {
        $scope.event = event;
        $scope.eventId = $routeParams.eventId;
        // console.log(event);
      });

    PicaticAPI.getEventTicketPrices($routeParams.eventId)
      .then(ticketPrices => {
        $scope.ticketPrices = ticketPrices;
        // console.log($scope.ticketPrices);
      });
  });
