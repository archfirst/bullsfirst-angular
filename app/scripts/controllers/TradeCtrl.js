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
 * Trade controller
 *
 * @authors
 * Vikas Goyal
 */

angular.module('bullsfirst')
    .controller('TradeCtrl', function ($scope) {
        'use strict';

        $scope.newOrder = {
            side: 'Buy',
            symbol: '',
            quantity: 0,
            type: 'market',
            limitPrice: {
                amount: 0,
                currency: 'USD'
            },
            term: 'GoodForTheDay',
            allOrNone: false
        };

        $scope.prices = {
            lastTradePrice: 0,
            fees: 10
        };


        $scope.prices.tradeCost = $scope.newOrder.quantity * $scope.prices.lastTradePrice;
        $scope.prices.tradeCost = $scope.prices.tradeCost + $scope.prices.fees;


        $scope.orderTypes = [
            'Market',
            'Limit'
        ];

        $scope.terms = [
            'GoodForTheDay',
            'GoodTilCanceled'
        ];

    });