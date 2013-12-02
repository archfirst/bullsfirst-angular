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


describe('Controller: TransactionsCtrl', function () {
    'use strict';

    var scope,
        TransactionsCtrl,
        TransactionsSvc;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($controller, $rootScope, _TransactionsSvc_) {
        scope = $rootScope.$new();
        TransactionsSvc = _TransactionsSvc_;

        TransactionsCtrl = $controller('TransactionsCtrl', {
            $scope: scope,
            TransactionsSvc: TransactionsSvc
        });
    }));

    describe('Controller: TransactionsCtrl #resetFilters', function () {
        it("should empty transactions array when triggered", function() {
            scope.transactions = ['test'];
            scope.$broadcast('FilterCtrl:resetFilters');
            expect(scope.transactions).toEqual([]);
        });
    });

    describe('Controller: TransactionsCtrl #applyFilters', function () {
        it("should call applyFilters function with filters object when triggered", function() {
            scope.filters = {
                accountChoice: '',
                fromDate: new Date(),
                toDate: new Date()
            };
            spyOn(scope, "applyFilters");
            scope.$broadcast('FilterCtrl:applyFilters');
            expect(scope.applyFilters).toHaveBeenCalledWith({
                fromDate: scope.filters.fromDate.getFullYear() +'-'+ (scope.filters.fromDate.getMonth()+1) +'-'+ scope.filters.fromDate.getDate(),
                toDate: scope.filters.toDate.getFullYear() +'-'+ (scope.filters.toDate.getMonth()+1) +'-'+ scope.filters.toDate.getDate()
            });
        });
        it("should fill transactions array with data when triggered", function() {
            scope.transactions = [];
            scope.filters = {
                accountChoice: '',
                fromDate: '2013-12-01',
                toDate: '2013-12-01'
            };

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
            httpBackend.expectGET("/bfoms-javaee/rest/secure/transactions?accountChoice=&fromDate=2013-12-01&toDate=2013-12-01").respond([{test:'testing'}]);
            scope.applyFilters(scope.filters);
            //httpBackend.expectGET(".*/transactions.*");
            httpBackend.flush();
            //expect(scope.transactions).toEqual([]);
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});