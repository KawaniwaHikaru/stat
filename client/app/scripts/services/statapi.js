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
        function ($http, $cacheFactory) {
            // AngularJS will instantiate a singleton by calling "new" on this function

            let urlBase = 'http://localhost:3000';
            let apiFactory = {};

            apiFactory.upload = function (file) {

                return $http({
                    method: 'POST',
                    url: urlBase + '/upload' + '?' + toQueryString(params),
                    headers: _headers
                }).then(response => {
                    return response.data.data;
                });
            };

            apiFactory.query = function (from, to) {
                return $http({
                    method: 'GET',
                    url: urlBase + '/query/weighted',
                    params: {
                        from: from,
                        to: to
                    }
                }).then(response => {
                    return response.data.data;
                });
            };

            return apiFactory;
        }]);
