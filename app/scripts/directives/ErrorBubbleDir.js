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
 * Error Bubble directive
 * Display an error bubble on fields with errors on a form
 *
 * @authors
 * Vikas Goyal
 */

'use strict';

angular.module('bullsfirst')
    .directive('errorBubble', function (utilities) {
        function validateField(el, $$body, $$errorBubbleContainer, $$errorBubble, $formField, errorBubbleId) {
            var boundingRect, bottom, left, style, errorsObj, fieldValue, prop;

            if ($formField.$invalid) {
                $$errorBubble.children().remove();
                boundingRect = el.getBoundingClientRect();
                bottom = utilities.getWindowSize().height - boundingRect.top - 8  + 'px';
                left = boundingRect.left + boundingRect.width - 80 + 'px';
                style = 'bottom: ' + bottom + ';left: ' + left + ';';

                errorsObj = $formField.$error;

                for (prop in errorsObj) {
                    if (errorsObj.hasOwnProperty(prop)) {
                        fieldValue = errorsObj[prop];
                        switch (prop) {
                        case 'required':
                            fieldValue && $$errorBubble.append('<div>*  This field is required</div>');
                            break;
                        case 'pattern':
                            fieldValue && $$errorBubble.append('<div>*  This field value is invalid</div>');
                            break;
                        case 'passwordMatch':
                            fieldValue && $$errorBubble.append('<div>*  Passwords do not match</div>');
                            break;
                        case 'nomsg':
                            break;
                        default:
                            fieldValue && $$errorBubble.append('<div>*  This field has errors</div>');
                            break;
                        }
                    }
                }
                if ($$errorBubble.children().length === 0) {
                    $$errorBubbleContainer.remove();
                    return;
                }
                $$errorBubbleContainer.attr('style', style);
                $$errorBubbleContainer.attr('id', errorBubbleId);
                $$body.append($$errorBubbleContainer);
            } else {
                $$errorBubbleContainer.remove();
            }
        }

        return {
            restrict: 'A',
            link: function (scope, $$element) {

                //Create jqLite wrappers for body and errorBubble
                var $$body = angular.element(document.body),
                    $$errorBubbleContainer = angular.element('<div class="input-error-container"></div>'),
                    $$errorBubble = angular.element('<div class="input-error-bubble"></div>'),
                    changeBound;

                //Add append errprBubble & arrow container to errorBubbleContainer
                $$errorBubbleContainer.append($$errorBubble);
                $$errorBubbleContainer.append('<div class="input-error-bubble-arrow"></div>');

                //Make sure we are not attaching change handlers repeatedly
                changeBound = $$element.data('changeBound');
                if (!changeBound) {
                    $$element.data('changeBound', true);

                    //Attach keyup event handler
                    $$element.on('keyup', function () {
                        //Get $form for this element
                        var el = this,
                            elName = el.getAttribute('name'),
                            errorBubbleId = 'errorBubble' + elName,
                            parentFormName = el.form.getAttribute('name'),
                            $form = scope[parentFormName],
                            $formField = $form[elName];


                        //If element is not inside a form, return
                        if (!$form || !$formField) {
                            return;
                        }

                        //If scope/form is destroyed removed the bubble
                        scope.$on('$destroy', function () {
                            $$errorBubbleContainer.remove();
                        });

                        //Validate the field
                        validateField(el, $$body, $$errorBubbleContainer, $$errorBubble, $formField, errorBubbleId);

                    });
                }
            }
        };
    });