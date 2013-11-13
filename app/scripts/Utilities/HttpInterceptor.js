/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interceptors for requests and responses
 *
 * @authors
 * Vikas Goyal
 */

angular.module('bullsfirst')
    .factory('bullsfirstHttpInterceptor', function ($q, $rootScope, $injector) {
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
            },
            'responseError': function (rejection) {
                var $modal = $injector.get('$modal');
                $modal.open({
                    backdrop: true,
                    templateUrl: 'views/Alert.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.messageType = 'Error';
                        var rejectionData = rejection.data;
                        if (rejectionData) {
                            if (rejectionData.detail) {
                                $scope.message = rejectionData.detail;
                            } else {
                                if (/<body>.+?<\/body>/.test(rejectionData)) {
                                    rejectionData.replace(/<body>(.+?)<\/body>/, function (match, group) {
                                        $scope.message = group;
                                    });
                                } else {
                                    $scope.message = 'Server error occurred';
                                }
                            }

                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                });
                return $q.reject(rejection);
            }
        };
    });