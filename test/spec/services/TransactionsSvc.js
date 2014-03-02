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
 * Transactions service test
 *
 * @authors
 * Solh Zendeh
 */

describe('Services: TransactionsService', function () {
    'use strict';

    var $httpBackend,
        TransactionsSvc,
        authorizationHeader,
        url,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _TransactionsSvc_, BASE64, OMSUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = OMSUrl + '/secure/transactions';
        TransactionsSvc = _TransactionsSvc_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/transactions$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: TransactionsService #get', function () {
        it('should make a GET request to the OMS server with correct authorization', function () {
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            TransactionsSvc.get();
            $httpBackend.flush();
        });
    });
});