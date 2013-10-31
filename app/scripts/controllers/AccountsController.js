/**
 * Created by vgoya2 on 10/28/13.
 */

angular.module('bullsfirst')
    .controller('AccountsController', function ($scope, BrokerageAccountsService, AccountsService, $location) {
        'use strict';

        $scope.$location = $location;

        $scope.brokerageAccounts = BrokerageAccountsService.query(function (data) {
            var totalMarketValue = 0,
                totalCashValue = 0;

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                totalMarketValue += item.marketValue.amount;
                totalCashValue += item.cashPosition.amount;
                
                var positions = item.positions;
                var newPositions = [];
                for (var j = 0, posLen = positions.length; j < posLen; j++) {
                    var position = positions[j];
                    if (position.children && Object.prototype.toString.call(position.children) === '[object Array]') {
                        position.isParent = true;
                        position.id = position.accountId + '_' + j;
                        newPositions.push(position);

                        for (var k = 0, childrenLen = position.children.length; k < childrenLen; k++) {
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
            }

            $scope.totals = {
                marketValue: totalMarketValue,
                cashValue: totalCashValue
            };


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
            AccountsService.changeName({accountId: accountId}, {newName: newName});
        };

    });