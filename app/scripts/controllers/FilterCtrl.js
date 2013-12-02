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
 * Filters controller
 *
 * @authors
 * Solh Zendeh
 */

angular.module('bullsfirst')
    .controller('FilterCtrl', function($scope, BrokerageAccountsSvc) {
        'use strict';
        
        $scope.brokerageAccounts = BrokerageAccountsSvc.query();
        $scope.filters = {
            accountChoice: '',
            fromDate: new Date(),
            toDate: new Date()
        };

        $scope.resetFilters = function() {
            $scope.filters = {
                accountChoice: '',
                fromDate: new Date(),
                toDate: new Date()
            };
            $scope.$emit('FilterCtrl:resetFilters');
        };
        $scope.applyFilters = function() {
            $scope.$emit('FilterCtrl:applyFilters');
        };
    });