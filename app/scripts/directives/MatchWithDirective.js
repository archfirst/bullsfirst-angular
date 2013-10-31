/**
 * Created by vgoya2 on 10/27/13.
 */

angular.module('bullsfirst')
    .directive('matchWith', function () {
        'use strict';

        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var $$matchWithElement = angular.element(document.getElementById(attrs.matchWith));

                function validateMatchWith() {
                    var thisElementValue = elem.val();
                    var matchElementValue = $$matchWithElement.val();
                    if (!thisElementValue || !matchElementValue || thisElementValue !== matchElementValue) {
                        elem.removeClass('ng-valid');
                        elem.addClass('ng-invalid');
                        $$matchWithElement.removeClass('ng-valid');
                        $$matchWithElement.addClass('ng-invalid');
                        if(ctrl) {
                            ctrl.$setValidity('match', false);
                            ctrl.$valid = false;
                            ctrl.$invalid = true;
                        }

                    } else {
                        elem.addClass('ng-valid');
                        elem.removeClass('ng-invalid');
                        $$matchWithElement.addClass('ng-valid');
                        $$matchWithElement.removeClass('ng-invalid');
                        if(ctrl) {
                            ctrl.$setValidity('match', true);
                            ctrl.$valid = true;
                            ctrl.$invalid = false;
                        }
                    }
                }
                elem.on('keyup', validateMatchWith);
                $$matchWithElement.on('keyup', validateMatchWith);

            }
        };

    });