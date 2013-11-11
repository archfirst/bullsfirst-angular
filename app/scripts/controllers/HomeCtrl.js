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
 * Home controller
 *
 * @authors
 * Vikas Goyal
 */


'use strict';

angular.module('bullsfirst')
    .controller('HomeCtrl', function ($scope, $resource, UsersSvc, $rootScope, BASE64, $location, $modal) {
        $scope.user = {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        };
        $scope.newUser = new UsersSvc();

        $scope.processKeyPressAction = function ($event, action) {
            // If a key was pressed and it was not enter key, return
            if ($event && $event.keyCode && $event.keyCode !== 13) {
                return;
            }
            switch (action) {
            case 'login':
                this.login();
                break;
            case 'openaccount':
                this.openAccount();
                break;
            default:
                break;
            }
        };

        $scope.login = function () {
            UsersSvc.login({
                username : this.user.username,
                password: this.user.password
            }, function (data) {
                // TODO Add a unit test for this
                $rootScope.loggedInUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    AuthorizationHeader: BASE64.encode($scope.user.username + ':' + $scope.user.password)
                };
                $location.path('/accounts');
            });
        };

        $scope.openAccount = function () {
            $scope.newUser.$save(function () {
                $modal.open({
                    backdrop: true,
                    templateUrl: 'views/Alert.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.messageType = 'Success!';
                        $scope.message = 'User created successfully. Please login to continue';
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                });
                $location.path('/');
            });
        };
    });