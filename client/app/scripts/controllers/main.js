'use strict';

/**
 * @ngdoc function
 * @name statFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statFrontendApp
 */
angular.module('statFrontendApp')
    .controller('MainCtrl', [
        '$scope', 'statAPI', 'Upload',

        function ($scope, statAPI, Upload) {
            $scope.file = '';
            $scope.weighted = false;
            $scope.from = new Date('2016-02-01');
            $scope.to = new Date('2016-02-05');

            $scope.requery = function () {
                statAPI
                    .query($scope.from, $scope.to)
                    .then(results => {

                        // we are weighting
                        if ($scope.weighted && results) {
                            $scope.results = results.map((n) => {
                                n.google *= n.weighted;
                                n.googleBaseRank *= n.weighted;
                                n.yahoo *= n.weighted;
                                n.bing *= n.weighted;
                                return n;
                            });
                        } else {
                            $scope.results = results;
                        }
                    });
            };


            // upload later on form submit or something similar
            $scope.submit = function () {
                // console.log($scope.file);
                $scope.upload($scope.file);
            };

            // upload on file select or drop
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/csv/upload',
                    data: {file: file}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    $scope.requery();
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            $scope.purge = function () {
                statAPI.purge().then(()=> {
                        $scope.requery();
                    }
                );
            };

            //
            // $scope.upload = function () {
            //     // console.log($scope);
            //     statAPI.upload($scope.csvFile);
            // };

            $scope.requery();
        }]);
