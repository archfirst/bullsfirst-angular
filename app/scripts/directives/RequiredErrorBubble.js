/**
 * Created by vgoya2 on 10/22/13.
 */

'use strict';

angular.module('bullsfirst')
    .directive('requirederrorbubble', function () {
        return {
            restrict: 'A',
            compile: function (element, attributes) {
                var el = element[0];
                var boundingRect = el.getBoundingClientRect();
                var errorDiv = document.createElement('div');
                errorDiv.classList.add('input-error-bubble');
                //errorDiv.classList.add('nodisplay');
                errorDiv.innerHTML = 'Ha Ha Ha';
                errorDiv.style.top = boundingRect.top - 50 + 'px';
                errorDiv.style.left = boundingRect.left + 200 + 'px';
                if(element.hasClass('ng-invalid')) {
                    errorDiv.classList.remove('nodisplay');
                }

                var body = document.getElementsByTagName('body')[0];
                body.appendChild(errorDiv);
            }
        };
    });