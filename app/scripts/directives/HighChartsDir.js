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
 * Highcharts directive
 *
 * @authors
 * Vikas Goyal
 */

'use strict';

angular.module('bullsfirst')
    .directive('highcharts', function () {

        return {
            restrict: 'E',
            scope: {
                type: '@',
                data: '=',
                width: '@',
                height: '@'
            },
            link: function (scope, $$element) {
                $$element.highcharts({
                    chart: {
                        plotBackgroundColor: '#ccc',
                        plotBorderWidth: null,
                        plotShadow: false,
                        width: scope.width,
                        height: scope.height
                    },
                    title: {
                        text: scope.title
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        type: scope.type,
                        data: scope.data
                    }]
                });

            }
        };
    });