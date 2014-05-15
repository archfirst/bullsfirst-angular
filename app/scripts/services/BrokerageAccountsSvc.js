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
 * Brokerage accounts service
 *
 * @authors
 * Vikas Goyal
 */

angular.module('bullsfirst')
    .factory('BrokerageAccountsSvc', function ($resource, OMSUrl, $rootScope) {
        'use strict';

        return $resource(OMSUrl + '/secure/brokerage_accounts', {}, {
            query: {
                method:'GET',
                isArray:true,
                headers: {
                    Authorization: 'Basic ' + $rootScope.loggedInUser.AuthorizationHeader
                }
            }
        });
    });