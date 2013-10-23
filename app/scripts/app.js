'use strict';


angular.module('bullsfirst', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'views/login.html', controller: 'LoginController'})
            .otherwise({redirectTo: '/'});
    }]);