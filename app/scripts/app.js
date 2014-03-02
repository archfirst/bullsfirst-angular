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
 * Application Entry Point
 *
 * @authors
 * Sagar Ganatra
 * Vikas Goyal
 */

'use strict';

angular.module('bullsfirst', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngSanitize', 'ui.select2'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'views/home/login.html', controller: 'HomeCtrl'})
            .when('/openaccount', {templateUrl: 'views/home/open-account.html', controller: 'HomeCtrl'})
            .when('/accounts', {templateUrl: 'views/accounts/accounts.html', controller: 'AccountsCtrl'})
            .when('/positions', {templateUrl: 'views/accounts/accounts.html', controller: 'AccountsCtrl'})
            .when('/orders', {templateUrl: 'views/accounts/accounts.html', controller: 'HomeCtrl'})
            .when('/transactions', {templateUrl: 'views/accounts/accounts.html', controller: 'AccountsCtrl'})
            .otherwise({redirectTo: '/'});
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('bullsfirstHttpInterceptor');
    });