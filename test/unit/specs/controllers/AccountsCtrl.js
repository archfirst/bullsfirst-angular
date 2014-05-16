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

    beforeEach(inject(function ($controller, $injector, $rootScope, AccountsSvc, InstrumentsSvc, BASE64) {
        scope = $rootScope.$new();

        $rootScope.loggedInUser = {
            firstName: 'wflintstone',
            lastName: 'cool',
            AuthorizationHeader: BASE64.encode('wflintstone:cool')
        };

        brokerageAccountService = $injector.get('BrokerageAccountsSvc');
        accountsService = AccountsSvc;
        instrumentsSvc = InstrumentsSvc;

        AccountsCtrl = $controller('AccountsCtrl', {
            $scope: scope,
            brokerageAccountService: brokerageAccountService
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
        var position = {
            id: 1,
            index: 0
        };

        beforeEach(function(){
            scope.setHoveredPosition(position);
        });

        it('should set hoveredPosition', function() {
            expect(scope.hoveredPosition).toEqual(position);
        });

        it('should set hoveredAccount', function() {
            expect(scope.hoveredAccount).toEqual({
                id: position.id + '_' + position.index
            });
        });
    });

    describe('Controller: AccountsController #unSetHoveredPosition', function() {
        beforeEach(function() {
            scope.hoveredPosition = 1;
            scope.hoveredAccount = 'test string';
        });
        
        it('should reset hoveredPosition to null', function() {
            expect(scope.hoveredPosition).not.toBeNull();
            scope.unSetHoveredPosition();
            expect(scope.hoveredPosition).toBeNull();
        });

        it('should reset hoveredAccount to null', function() {
            expect(scope.hoveredAccount).not.toBeNull();
            scope.unSetHoveredPosition();
            expect(scope.hoveredAccount).toBeNull();
        });
    });

    describe('Controller: AccountsController #showPositions', function() {
        var account = {
            name: 'test account'
        };

        beforeEach(function() {
            spyOn(scope, 'setChartData');
            spyOn(scope, 'unSetHoveredAccount');
            scope.showPositions(account);
        });

        it('should set selectedAccount to the passed in object', function() {
            expect(scope.selectedAccount).toEqual(account);
        });

        it('should set accountDetails to true', function() {
            expect(scope.accountDetails).toBe(true);
        });

        it('should call unSetHoveredAccount()', function() {
            expect(scope.unSetHoveredAccount).toHaveBeenCalled();
        });

        it('should call setChartData()', function() {
            expect(scope.setChartData).toHaveBeenCalledWith(account);
        });

        it('should set chartTitle', function() {
            expect(scope.chartTitle).toEqual(account.name);
        });

        it('should set chartSubtitle', function() {
            expect(scope.chartSubtitle).toEqual('Click on a position to view accounts');
        });
    });

    describe('Controller: AccountsController #hidePositions', function() {
        beforeEach(function() {
            spyOn(scope, 'unSetHoveredAccount');
            scope.hidePositions();
        });

        it('should set selectedAccount to be an empty object', function() {
            expect(scope.selectedAccount).toEqual({});
        });

        it('should set accountDetails to false', function() {
            expect(scope.accountDetails).toBe(false);
        });

        it('should call unSetHoveredAccount', function() {
            expect(scope.unSetHoveredAccount).toHaveBeenCalled();
        });

        it('should set chartData', function() {
            expect(scope.chartData).toEqual(scope.allAccountData);
        });

        it('should set chartTitle', function() {
            expect(scope.chartTitle).toEqual('All Accounts');
        });

        it('should set chartSubtitle', function() {
            expect(scope.chartSubtitle).toEqual('Click on an account to view positions');
        });
    });

    describe('Controller: AccountsController #setChartData', function() {
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
            objectOut;

        beforeEach(function() {
            objectOut = scope.setChartData(objectIn);
        });

        it('formats the first position of the array properly', function() {
            expect(objectOut[0]).toEqual({
                name: 'Apple Inc',
                y: 100,
                id: '1_0'
            });
        });
        
        it('formats the second position of the array properly', function() {
            expect(objectOut[1]).toEqual({
                name: 'Cash',
                y: 200.25,
                id: '1_1'
            });
        });

        it('creates an object array the same length as the positions array in the passed in object', function() {
            expect(objectOut.length).toEqual(2);
        });
    });

});