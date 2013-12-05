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
 * Transactions Filter controller
 *
 * @authors
 * Solh Zendeh
 */

angular.module('bullsfirst')
    .controller('TransactionsFilterCtrl', function($scope, BrokerageAccountsSvc) {
        'use strict';

        // HANDLER FUNCTIONS
        $scope.resetFilters = function() {
            $scope.filters.accountChoice    = '';
            $scope.filters.fromDate         = new Date();
            $scope.filters.toDate           = new Date();

            $scope.$emit('TransactionsFilterCtrl:resetFilters');
        };
        $scope.applyFilters = function() {
            if (! $scope.filters.fromDate) {
                $scope.filters.fromDate = new Date();
            }
            if (! $scope.filters.toDate) {
                $scope.filters.toDate = new Date();
            }
            $scope.$emit('TransactionsFilterCtrl:applyFilters');
        };

        // INIT
        $scope.brokerageAccounts = BrokerageAccountsSvc.query();
        $scope.filters = {
            accountChoice:  '',
            fromDate:       new Date(),
            toDate:         new Date(),
            maxDate:        new Date(),
            select2Options: {minimumResultsForSearch:-1}
        };
    });