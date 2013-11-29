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
 * Transactions controller
 *
 * @authors
 * Solh Zendeh
 */


angular.module('bullsfirst')
    .controller('TransactionsCtrl', function ($scope, BrokerageAccountsSvc, $location, $modal) {
        'use strict';

        $scope.$location = $location;

        $scope.tabs = [
            {
                label: 'ACCOUNTS',
                path: 'accounts'
            },
            {
                label: 'POSITIONS',
                path: 'positions'
            },
            {
                label: 'ORDERS',
                path: 'orders'
            },
            {
                label: 'TRANSACTION HISTORY',
                path: 'transactions'
            }

        ];

        $scope.selectedTab = $scope.tabs[3];

        $scope.selectTab = function (tab) {
            $scope.selectedTab = tab;
        };

        $scope.brokerageAccounts = BrokerageAccountsSvc.query();
        $scope.fromDate = new Date();
        $scope.toDate = new Date();

        $scope.openModal = function () {
            $modal.open({
                templateUrl: 'views/accounts/trade-form.html',
                backdrop: false,
                scope: $scope
            });
        };

        $scope.signOut = function () {
            delete $scope.loggedInUser;
        };
    });