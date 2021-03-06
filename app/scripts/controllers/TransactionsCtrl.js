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
 * Transactions controller
 *
 * @authors
 * Vikas Goyal
 * Solh Zendeh
 */
angular.module('bullsfirst')
    .controller('TransactionsCtrl', function ($scope, BrokerageAccountsSvc, TransactionsSvc) {
        'use strict';

        // HANDLER FUNCTIONS
        $scope.resetFilters = function() {
            $scope.filters.accountChoice    = '';
            $scope.filters.fromDate         = new Date();
            $scope.filters.toDate           = new Date();

            $scope.transactions             = [];
        };
        $scope.applyFilters = function() {
            if (! $scope.filters.fromDate) {
                $scope.filters.fromDate = new Date();
            }
            if (! $scope.filters.toDate) {
                $scope.filters.toDate = new Date();
            }

            var fromDate        = $scope.filters.fromDate;
            var toDate          = $scope.filters.toDate;
            var accountChoice   = $scope.filters.accountChoice;

            var queryFilters = {
                fromDate:   fromDate.getFullYear() +'-'+ (fromDate.getMonth()+1) +'-'+ fromDate.getDate(),
                toDate:     toDate.getFullYear() +'-'+ (toDate.getMonth()+1) +'-'+ toDate.getDate()
            };

            if (accountChoice) {
                queryFilters.accountId = accountChoice;
            }

            $scope.transactions = TransactionsSvc.query(queryFilters);
        };

        // INIT
        $scope.filters = {
            accountChoice:  '',
            fromDate:       new Date(),
            toDate:         new Date(),
            maxDate:        new Date(),
            select2Options: {minimumResultsForSearch:-1}
        };
        $scope.brokerageAccounts = BrokerageAccountsSvc.query();
        $scope.transactions = [];
    });