'use strict';

angular.module('bullsfirst')
    .controller('LoginController', function ($scope) {
        $scope.user = {
            username: "Vikas",
            password: "sdsd"
        };
        $scope.loginUser = function () {
            alert("Hi " + this.user.username);
        };
    });