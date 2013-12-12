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
 * Accounts controller
 *
 * @authors
 * Vikas Goyal
 */


angular.module('bullsfirst')
    .controller('AccountsCtrl', function ($scope, AccountsSvc,
                                          InstrumentsSvc, $location, $modal) {
        'use strict';

        $scope.$location = $location;

        $scope.tabs = [
            {
                label: 'ACCOUNTS',
                path: '/accounts'
            },
            {
                label: 'POSITIONS',
                path: '/positions'
            },
            {
                label: 'ORDERS',
                path: '/orders'
            },
            {
                label: 'TRANSACTION HISTORY',
                path: '/transactions'
            }

        ];

        $scope.selectTab = function (tab) {
            $scope.selectedTab = tab;
        };

        $scope.hoveredAccount = null;

        $scope.setHoveredAccount = function (account) {
            $scope.hoveredAccount = account;
        };
        $scope.unSetHoveredAccount = function () {
            $scope.hoveredAccount = null;
        };

        $scope.togglePositionExpand = function (selectedAccount, positionId) {
            angular.forEach(selectedAccount.positions, function (position) {
                if (!position.isParent && position.parentId === positionId) {
                    if (position.isExpanded) {
                        position.isExpanded = false;
                    } else {
                        position.isExpanded = true;
                    }
                }

            });

        };

        $scope.changeAccountName = function (accountId, newName) {
            AccountsSvc.changeName({accountId: accountId}, {newName: newName});
        };

        $scope.instruments = InstrumentsSvc.query();

        $scope.getMarketPrice = function (symbol) {
            return InstrumentsSvc.getMarketPrices({instrumentSymbol: symbol});
        };

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