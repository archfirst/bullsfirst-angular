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
 * Filter controller test
 *
 * @authors
 * Solh Zendeh
 */


describe('Controller: FilterCtrl', function() {
    'use strict';

    var FilterCtrl,
        scope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function($controller, $rootScope, _BrokerageAccountsSvc_) {
        scope = $rootScope.$new();

        FilterCtrl = $controller('FilterCtrl', {
            $scope: scope,
            BrokerageAccountsSvc: _BrokerageAccountsSvc_
        });
    }));

    describe('Controller: FilterCtrl #resetFilters', function() {
        it('should set accountChoice to default', function() {
            scope.resetFilters();
            expect(scope.filters.accountChoice).toEqual('');
        });

        it('should set fromDate to current date', function() {
            scope.resetFilters();
            expect(scope.filters.fromDate).toEqual(new Date());
        });

        it('should set toDate to current date', function() {
            scope.resetFilters();
            expect(scope.filters.toDate).toEqual(new Date());
        });

        it("should $emit the correct, er, emission", function() {
            spyOn(scope, "$emit");
            scope.resetFilters();
            expect(scope.$emit).toHaveBeenCalledWith("FilterCtrl:resetFilters");
        });
    });

    describe('Controller: FilterCtrl #applyFilters', function() {
        it("should $emit the correct, er, emission", function() {
            spyOn(scope, "$emit");
            scope.applyFilters();
            expect(scope.$emit).toHaveBeenCalledWith("FilterCtrl:applyFilters");
        });
    });
});