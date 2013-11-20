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
 * Trade controller test
 *
 * @authors
 * Vikas Goyal
 */

describe('Controller: TradeController', function () {
    'use strict';

    var TradeCtrl,
        scope,
        ordersSvc,
        instrumentsSvc,
        accountsService;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($controller, $rootScope, OrdersSvc, AccountsSvc, InstrumentsSvc) {
        scope = $rootScope.$new();
        ordersSvc = OrdersSvc;
        accountsService = AccountsSvc;
        instrumentsSvc = InstrumentsSvc;

        TradeCtrl = $controller('TradeCtrl', {
            $scope: scope,
            ordersService: OrdersSvc
        });

    }));


    describe('Controller: TradeController #ordersService', function () {
        var order = {
            brokerageAccountId: 1234,
            orderParams: {
                side: 'Sell',
                symbol: 'AAPL',
                quantity: 100,
                type: 'Limit',
                limitPrice: {
                    amount: 344.60,
                    currency: 'USD'
                },
                term: 'GoodForTheDay',
                allOrNone: false
            }
        };
        it('should call OrdersService`s save method', function () {
            /*spyOn(ordersSvc, 'save');
            scope.createOrder(order);
            expect(ordersSvc.save).toHaveBeenCalledWith(order);*/
        });
    });


});