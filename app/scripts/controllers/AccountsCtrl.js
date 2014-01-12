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
    .controller('AccountsCtrl', function ($scope, BrokerageAccountsSvc, AccountsSvc,
                                          InstrumentsSvc, $location, $modal) {
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

        $scope.selectedTab = $scope.tabs[0];

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

        //TODO: Do this in positions controller
        $scope.brokerageAccounts = BrokerageAccountsSvc.query(function (data) {
            var totalMarketValue = 0,
                totalCashValue = 0,
                chartData = [],
                i, j, k, len, posLen, childrenLen;

            for (i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                item.y = item.marketValue.amount;
                totalMarketValue += item.marketValue.amount;
                totalCashValue += item.cashPosition.amount;
                
                var positions = item.positions;
                var newPositions = [];
                for (j = 0, posLen = positions.length; j < posLen; j++) {
                    var position = positions[j];
                    if (position.children && Object.prototype.toString.call(position.children) === '[object Array]') {
                        position.isParent = true;
                        position.id = position.accountId + '_' + j;
                        newPositions.push(position);

                        for (k = 0, childrenLen = position.children.length; k < childrenLen; k++) {
                            var childPosition = position.children[k];
                            childPosition.parentId = position.id;
                            newPositions.push(childPosition);
                        }
                        delete position.children;

                    } else {
                        position.isExpanded = true;
                        newPositions.push(position);
                    }
                }
                item.positions = newPositions;
                chartData.push({
                    name: item.name,
                    y: item.marketValue.amount,
                    id: item.id
                });

            }

            $scope.totals = {
                marketValue: totalMarketValue,
                cashValue: totalCashValue
            };

            // Init chart titles
            $scope.chartTitle = 'All Accounts';
            $scope.chartSubtitle = 'Click on an account to view positions';

            $scope.allAccountData = data;
            $scope.chartData = data;

        });


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

        // Chart loading boolean
        $scope.renderComplete = false;

        // Drill down to account details
        $scope.accountDetails = false;
        $scope.hoveredPosition = null;

        $scope.setHoveredPosition = function (position) {
            $scope.hoveredPosition = position;
            $scope.hoveredAccount = {
                id: position.id + '_' + position.index
            };
        };

        $scope.unSetHoveredPosition = function () {
            $scope.hoveredPosition = null;
            $scope.hoveredAccount = null;
        };
        
        $scope.showPositions = function(account) {   
            $scope.selectedAccount = account;
            $scope.accountDetails = true;
            $scope.unSetHoveredAccount();

            $scope.chartData = $scope.setChartData(account);
            $scope.chartTitle = account.name;
            $scope.chartSubtitle = 'Click on a position to view accounts';
        };

        $scope.hidePositions = function() {       
            $scope.selectedAccount = {};
            $scope.accountDetails = false;
            $scope.unSetHoveredAccount();

            $scope.chartData = $scope.allAccountData;
            $scope.chartTitle = 'All Accounts';
            $scope.chartSubtitle = 'Click on an account to view positions';
        };

        $scope.setChartData = function(account) {
            var data = account.positions,
                chartData = [],
                i,
                len = data.length;

            for (i=0; i<len; i++) {
                chartData.push({
                    name: data[i].instrumentName,
                    y: data[i].marketValue.amount,
                    id: account.id + '_' + i
                });
            }

            return chartData;           
        };

    });