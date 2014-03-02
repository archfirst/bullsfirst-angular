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
 * Position percentage filter
 * Returning what percent of the account the position is
 *
 * @authors
 * Alasdair Swan
 */

angular.module('bullsfirst')
    .filter('positionPercentage', function () {
        'use strict';

        return function (input, total) {
            var percent = (input/total) * 100,
                rounded = (total === 0) ? 0 : percent.toFixed(1);

            return rounded + '%';
        };
    });
