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
 * 'Match With' directive.
 * Allows validation of two form input fields which are supposed to be in sync
 * e.g password and confirm-password
 *
 * @authors
 * Vikas Goyal
 */

angular.module('bullsfirst')
    .directive('matchWith', function () {
        'use strict';

        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var $$matchWithElement = angular.element(document.getElementById(attrs.matchWith)),
                    $matchWithElementModelCtrl = $$matchWithElement.inheritedData().$ngModelController;

                //If value of the matchWithElement changes, clear this element
                $matchWithElementModelCtrl.$viewChangeListeners.push(function () {
                    elem.val('');
                });

                //Bind event listener to keyup of this element
                elem.on('keyup', function () {
                    var thisElementValue = elem.val(),
                        matchElementValue = $$matchWithElement.val();
                    //if thisElement's value is not a substring of the matchElement set the error
                    if (ctrl) {
                        if (thisElementValue && matchElementValue) {
                            if (matchElementValue.indexOf(thisElementValue) !== 0) {
                                ctrl.$setValidity('passwordMatch', false);
                            } else {
                                ctrl.$setValidity('passwordMatch', true);
                                if (matchElementValue !== thisElementValue) {
                                    ctrl.$setValidity('nomsg', false);
                                } else {
                                    ctrl.$setValidity('nomsg', true);
                                }
                            }
                        }
                    }
                });

            }
        };

    });