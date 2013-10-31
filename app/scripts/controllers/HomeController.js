'use strict';

angular.module('bullsfirst')
    .controller('HomeController', function ($scope, $resource, User, $rootScope, BASE64, $location) {
        $scope.user = {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        };

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
            User.login({
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

            }, function () {
                alert('error');
            });
        };

        $scope.openAccount = function () {
            User.save(this.user, function () {
                alert('success');
            }, function () {
                alert('failure');
            });
        };
    });