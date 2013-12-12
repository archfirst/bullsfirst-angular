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
 * Transactions Filter directive test
 *
 * @authors
 * Solh Zendeh
 */
describe('Directive: bfTransactionsFilter', function () {
    'use strict';

    var $compile,
        $httpBackend,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
        $compile        = _$compile_;
        $httpBackend    = _$httpBackend_;
        $rootScope      = _$rootScope_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation;
        $httpBackend.verifyNoOutstandingRequest;
    });

    /* It is completely unclear to me how to get this to work
     * I need Vikas to guide me here.
     */
    it('Replaces the element with the appropriate content', function() {
        $httpBackend.whenGET('/app/views/directives/bf-transactions-filter.html').respond("How do I get the actual template in here--I don't know!");
        
        var element = angular.element('<div bf-transactions-filter></div>');
        
        $compile(element)($rootScope);
        
        $httpBackend.flush();

        $rootScope.$digest();

        expect(element.html()).toContain("I don't know!");
    });
});