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


});