/**
 * Created by vgoya2 on 10/22/13.
 */

'use strict';

angular.module('bullsfirst')
    .directive('requirederrorbubble', function () {
        return {
            restrict: 'A',
            compile: function (scope, $$element, attributes) {
                var el = $$element[0];
                var boundingRect = el.getBoundingClientRect();

                var top = boundingRect.top - 50 + 'px';
                var left = boundingRect.left + 200 + 'px';
                var style = "top: " + top + ";left: " + left + ";";

                var $$errorDiv = angular.element('<div class="input-error-bubble nodisplay" ng-show="checkRequiredValidity()" style="' + style + '">Ha Ha Ha</div>');

                var $$body = angular.element('body');
                $$body.append($$errorDiv);
            }
        };
    });