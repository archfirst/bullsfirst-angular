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
 * Transactions controller test
 *
 * @authors
 * Solh Zendeh
 */
describe('Controller: TransactionsCtrl', function() {
    'use strict';

    var scope,
        TransactionsCtrl,
        BrokerageAccountsSvc,
        TransactionsSvc;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function($controller, $rootScope, _BrokerageAccountsSvc_, _TransactionsSvc_) {
        scope = $rootScope.$new();
        BrokerageAccountsSvc = _BrokerageAccountsSvc_;
        TransactionsSvc = _TransactionsSvc_;

        TransactionsCtrl = $controller('TransactionsCtrl', {
            $scope: scope,
            BrokerageAccountsSvc: BrokerageAccountsSvc,
            TransactionsSvc: TransactionsSvc
        });
    }));

    describe('Controller: TransactionsCtrl #resetFilters', function() {
        it("should empty transactions array when triggered", function() {
            scope.transactions = ['test'];
            scope.resetFilters();
            expect(scope.transactions).toEqual([]);
        });
    });

    describe('Controller: TransactionsCtrl #applyFilters', function() {
        it("should fill transactions array with data when triggered", function() {
            var fromDate = new Date();
            var toDate = new Date();

            scope.transactions = [];
            scope.filters = {
                accountChoice: '',
                fromDate: fromDate,
                toDate: toDate
            };

            var testFromDate    = fromDate.getFullYear() +'-'+ (fromDate.getMonth()+1) +'-'+ fromDate.getDate();
            var testToDate      = toDate.getFullYear() +'-'+ (toDate.getMonth()+1) +'-'+ toDate.getDate();

            var httpBackend, authorizationHeader, $rootScope;

            inject(function($httpBackend, BASE64, _$rootScope_) {
                authorizationHeader = BASE64.encode('wflintstone:cool');
                $rootScope = _$rootScope_;

                $rootScope.user = {
                    firstName: 'User1',
                    lastName: 'User1',
                    AuthorizationHeader: authorizationHeader
                };
                httpBackend = $httpBackend;
            })
            
            // controller automatically gets brokerage accounts, so have to flush those first...
            httpBackend.expectGET("/bfoms-javaee/rest/secure/brokerage_accounts").respond([{test:'testing'}]);
            httpBackend.flush();

            // now we can test what gets sent...
            scope.applyFilters();
            
            httpBackend.expectGET("/bfoms-javaee/rest/secure/transactions?fromDate="+ testFromDate +"&toDate="+ testToDate).respond([{test:'testing'}]);
            httpBackend.flush();

            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});