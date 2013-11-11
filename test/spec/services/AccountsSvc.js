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
 * Accounts service test
 *
 * @authors
 * Vikas Goyal
 */
describe('Services: AccountsService', function () {
    'use strict';

    var $httpBackend,
        AccountsSvc,
        authorizationHeader,
        url,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _AccountsSvc_, BASE64, OMSUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = OMSUrl + '/secure/accounts/1234/';
        AccountsSvc = _AccountsSvc_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/brokerage_accounts$/).respond(200);
        $httpBackend.whenPOST(/change_name$|transfer_cash$|transfer_securities$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: AccountsSevice #changeName', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'change_name';
            $httpBackend.expectPOST(url, {newName: 'Brokerage Account 1'},  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsSvc.changeName({accountId: 1234}, {
                newName: 'Brokerage Account 1'
            });
            $httpBackend.flush();
        });
    });

    describe('Services: AccountsSevice #transferCash', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'transfer_cash';
            var postData = {
                amount: {
                    amount: 1000.00,
                    currency: 'USD'
                },
                toAccountId: 5678
            };
            $httpBackend.expectPOST(url, postData,  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsSvc.transferCash({accountId: 1234}, postData);
            $httpBackend.flush();
        });
    });

    describe('Services: AccountsSevice #transferSecurities', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'transfer_securities';
            var postData = {
                symbol: 'CSCO',
                quantity: 1000,
                pricePaidPerShare: {
                    amount: 19.23,
                    currency: 'USD'
                },
                toAccountId: 5678
            };
            $httpBackend.expectPOST(url, postData,  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsSvc.transferSecurities({accountId: 1234}, postData);
            $httpBackend.flush();
        });
    });
});