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
 * Capitalize directive
 *
 * @authors
 * Vikas Goyal
 */

angular.module('bullsfirst')
    .directive('capitalize', function () {
        'use strict';

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, $$element, attr, ctrl) {
                ctrl.$formatters.push(function (input) {
                    var output = input.toLowerCase();
                    return output.charAt(0).toUpperCase() + output.substr(1);
                });
            }
        };
    });
