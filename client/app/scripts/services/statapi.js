'use strict';

/**
 * @ngdoc service
 * @name statFrontendApp.statAPI
 * @description
 * # statAPI
 * Service in the statFrontendApp.
 */
angular.module('statFrontendApp')
    .factory('statAPI', [
        '$http', '$cacheFactory',
        function ($http) {
            // AngularJS will instantiate a singleton by calling "new" on this function

            let urlBase = 'http://localhost:3001';
            let apiFactory = {};

            // handle upload
            apiFactory.purge = function () {
                return $http.get(urlBase + '/csv/purge').then(response => {
                    return response.data.data;
                });
            };

            apiFactory.upload = function (file) {

                console.log(file);
                return $http({
                    method: "POST",
                    url: urlBase + '/csv/upload',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: {
                        csvFile: file
                    },
                    transformRequest: function (data, headersGetterFunction) {
                        return data; // do nothing! FormData is very good!
                    }
                }).then(response => {
                    return response.data.data;
                });
            };

            apiFactory.query = function (from, to) {
                // console.log(from, to);
                return $http.get(urlBase + '/query/weighted', {
                        params: {
                            from: from.toISOString().slice(0, 10),
                            to: to.toISOString().slice(0, 10)

                        }
                    }
                ).then(response=> {
                        // bad thing here, we need to fix the server side
                        // so we return proper JSON
                        return JSON.parse(response.data);
                    }, err=>console.log(err)
                );
            };

            return apiFactory;
        }]);
