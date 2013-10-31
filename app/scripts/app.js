'use strict';

angular.module('bullsfirst', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'views/home/login.html', controller: 'HomeController'})
            .when('/openaccount', {templateUrl : 'views/home/open-account.html', controller: 'HomeController'})
            .when('/accounts', {templateUrl : 'views/accounts/accounts.html', controller: 'AccountsController'})
            .when('/positions', {templateUrl : 'views/accounts/accounts.html', controller: 'AccountsController'})
            .when('/orders', {templateUrl : 'views/accounts/accounts.html', controller: 'HomeController'})
            .when('/transations', {templateUrl : 'views/accounts/accounts.html', controller: 'HomeController'})
            .otherwise({redirectTo: '/'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('bullsfirstRequestInterceptor');
    });