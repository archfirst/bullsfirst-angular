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
 * Accounts controller test
 *
 * @authors
 * Vikas Goyal
 * Alasdair Swan
 */


describe('Controller: AccountsController', function () {
    'use strict';

    var AccountsCtrl,
        scope,
        brokerageAccountService,
        instrumentsSvc,
        accountsService;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($controller, $rootScope, BrokerageAccountsSvc, AccountsSvc, InstrumentsSvc) {
        scope = $rootScope.$new();
        brokerageAccountService = BrokerageAccountsSvc;
        accountsService = AccountsSvc;
        instrumentsSvc = InstrumentsSvc;

        AccountsCtrl = $controller('AccountsCtrl', {
            $scope: scope,
            brokerageAccountService: BrokerageAccountsSvc
        });

    }));


    describe('Controller: AccountsController #changeAccountName', function () {
        it('should call AccountService`s changeName method', function () {
            spyOn(accountsService, 'changeName');
            scope.changeAccountName(1234, 'test');
            expect(accountsService.changeName).toHaveBeenCalledWith({accountId: 1234}, {newName: 'test'});
        });
    });

    describe('Controller: AccountsController #getMarketPrice', function () {
        it('should call InstrumentsService`s getMarketPrices method', function () {
            spyOn(instrumentsSvc, 'getMarketPrices');
            scope.getMarketPrice('AAPL');
            expect(instrumentsSvc.getMarketPrices).toHaveBeenCalledWith({instrumentSymbol: 'AAPL'});
        });
    });

    describe('Controller: AccountsController #setHoveredPosition', function() {
        it('should set hoveredPosition and hoveredAccount', function() {
            var position = {
                id: 1,
                index: 0
            };
            scope.setHoveredPosition(position);

            expect(scope.hoveredPosition).toEqual(position);
            expect(scope.hoveredAccount).toEqual({
                id: position.id + '_' + position.index
            });
        });
    });

    describe('Controller: AccountsController #unSetHoveredPosition', function() {
        it('should reset hoveredPosition and hoveredAccount to null', function() {
            scope.hoveredPosition = 1;
            scope.hoveredAccount = 'test string';
            expect(scope.hoveredPosition).not.toBeNull();
            expect(scope.hoveredAccount).not.toBeNull();

            scope.unSetHoveredPosition();
            expect(scope.hoveredPosition).toBeNull();
            expect(scope.hoveredAccount).toBeNull();
        });
    });

    describe('Controller: AccountsController #showPositions', function() {
        it('should set scope params to show positions', function() {
            var account = {
                name: 'test account'
            };

            spyOn(scope, 'setChartData');
            spyOn(scope, 'unSetHoveredAccount');
            scope.showPositions(account);

            expect(scope.selectedAccount).toEqual(account);
            expect(scope.accountDetails).toBe(true);
            expect(scope.unSetHoveredAccount).toHaveBeenCalled();

            expect(scope.setChartData).toHaveBeenCalledWith(account);
            expect(scope.chartTitle).toEqual(account.name);
            expect(scope.chartSubtitle).toEqual('Click on a position to view accounts');
        });
    });

    describe('Controller: AccountsController #hidePositions', function() {
        it('should set scope params to hide positions', function() {

            spyOn(scope, 'unSetHoveredAccount');
            scope.hidePositions();

            expect(scope.selectedAccount).toEqual({});
            expect(scope.accountDetails).toBe(false);
            expect(scope.unSetHoveredAccount).toHaveBeenCalled();

            expect(scope.cChartData).toEqual(scope.allAccountData);
            expect(scope.chartTitle).toEqual('All Accounts');
            expect(scope.chartSubtitle).toEqual('Click on an account to view positions');
        });
    });

    describe('Controller: AccountsController #setChartData', function() {
        it('should return an object array formatted for Highcharts', function() {
            var objectIn = {
                    id: 1,
                    positions: [
                        {
                            instrumentName: 'Apple Inc',
                            marketValue: {
                                amount: 100,
                                currency: 'USD'
                            }
                        }, {
                            instrumentName: 'Cash',
                            marketValue: {
                                amount: 200.25,
                                currency: 'USD'
                            }
                        }
                    ]
                },
                objectOut = scope.setChartData(objectIn);

            expect(objectOut[0]).toEqual({
                name: 'Apple Inc',
                y: 100,
                id: '1_0'
            });
            
            expect(objectOut[1]).toEqual({
                name: 'Cash',
                y: 200.25,
                id: '1_1'
            });
        });
    });


});