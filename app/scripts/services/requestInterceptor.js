/**
 * Created by vgoya2 on 10/26/13.
 */

angular.module('bullsfirst')
    .factory('bullsfirstRequestInterceptor', function ($q, $rootScope) {
        'use strict';

        return {
            'request': function (config) {
                //User is not logged in. This could be the login request
                if (config.params && config.params.password) {
                    config.headers.password = config.params.password;
                    delete config.params.password;
                } else {
                    if ($rootScope.user && $rootScope.user.AuthorizationHeader) {
                        config.headers.Authorization = $rootScope.user.AuthorizationHeader;
                    }
                }
                return config || $q.when(config);
            }
        };
    });