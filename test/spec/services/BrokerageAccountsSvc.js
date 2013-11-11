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
 * Brokerage accounts service test
 *
 * @authors
 * Vikas Goyal
 */

describe('Services: BrokerageAccountsService', function () {
    'use strict';

    var $httpBackend,
        BrokerageAccountsSvc,
        authorizationHeader,
        url,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _BrokerageAccountsSvc_, BASE64, OMSUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = OMSUrl + '/secure/brokerage_accounts';
        BrokerageAccountsSvc = _BrokerageAccountsSvc_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/brokerage_accounts$/).respond(200);
        $httpBackend.whenPOST(/brokerage_accounts$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: BrokerageAccountsSevice #get', function () {
        it('should make a GET request to the OMS server with correct authorization', function () {
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            BrokerageAccountsSvc.get();
            $httpBackend.flush();
        });
    });

    describe('Services: BrokerageAccountsSevice #save', function () {
        it('should make a POST request to the OMS server with correct authorization', function () {
            $httpBackend.expectPOST(url, {accountName: 'Brokerage Account 1'},  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            BrokerageAccountsSvc.save({
                accountName: 'Brokerage Account 1'
            });
            $httpBackend.flush();
        });
    });
});