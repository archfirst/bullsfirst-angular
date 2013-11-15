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
 * Orders controller test
 *
 * @authors
 * Vikas Goyal
 */

describe('Controller: OrdersController', function () {
    'use strict';
    var ordersController,
        ordersService,
        scope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($controller, $rootScope) {
//        ordersService = _OrdersSvc_;
//        scope = $rootScope.$new();
//        ordersController = $controller('OrdersCtrl', {
//            $scope: scope,
//            ordersService: _OrdersSvc_
//        });
    }));


    describe('Controller: OrdersController #getOrders', function () {
        it('should call get method of the OrdersService with correct parameters', function () {
//            spyOn(ordersService, 'get');
//            scope.getOrders();
//            expect(ordersService.get).toHaveBeenCalled();
        });
    });
});