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
 * Orders service test
 *
 * @authors
 * Vikas Goyal
 */

describe('Services: OrdersService', function () {
    var ordersSvc,
        $httpBackend;

    var url = '/bfoms-javaee/rest/secure/orders?fromDate=2011-01-01&statuses=Filled,Canceled';

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (OrdersSvc, _$httpBackend_) {
        ordersSvc = OrdersSvc;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(url).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: OrdersService #getOrders', function () {
        it('should call backend server with correct authorization and parameters for getOrders', function () {
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                myOrderno: 1
            });
            ordersSvc.get();
            $httpBackend.flush();
        });
    });
});