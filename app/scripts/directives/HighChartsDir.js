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
    .directive('highcharts', function (utilities) {

        return {
            restrict: 'E',
            scope: {
                type: '@',
                width: '@',
                height: '@',
                data: '=',
                name: '=',
                subtitle: '=',
                renderComplete: '=',
                highlighted: '=',
                setHoveredAccount: '&',
                unSetHoveredAccount: '&'
            },
            link: function (scope, $$element) {
                
                var animateSlice = function(slice, moveOut) {        
                    if (slice.graphic !== null) {
                        if (moveOut) {
                            slice.graphic.animate(slice.slicedTranslation);
                        } else {
                            slice.graphic.animate({
                                translateX: 0,
                                translateY: 0
                            });
                        }
                    }
                };

                var clearSelectedRow = function(selector) {
                    var rows = document.querySelectorAll(selector),
                        i,
                        len = rows.length;

                    for (i=0; i<len; i++) {
                        rows[i] = utilities.clearClass(rows[i], 'selected');
                    }
                };

                var initHighlightWatch = function(chart) {
                    var selectedSlice = null;

                    return scope.$watch('highlighted', function() {
                        var i,
                            len = chart.series[0].data.length,
                            currentId;

                        if (scope.renderComplete) {
                            if (scope.highlighted !== null) {

                                currentId = scope.highlighted.id;
                                
                                // Get index of highlighted row
                                for (i=0; i<len; i++) {
                                    if (chart.series[0].data[i].id === currentId) {
                                        selectedSlice = chart.series[0].data[i];
                                    }
                                }

                                animateSlice(selectedSlice, true);

                            } else if (selectedSlice !== null) {
                                // Clear hover state
                                animateSlice(selectedSlice, false);
                            }
                        }
                    });
                };

                scope.$watch('data', function () {
                    // Set chart options
                    var options = {
                            custom: {
                                seriesLoaded: 0
                            },
                            chart: {
                                backgroundColor: '#D8D8D8',
                                borderRadius: 0,
                                plotBorderWidth: null,
                                plotShadow: false,
                                width: scope.width,
                                height: scope.height,
                                type: scope.type
                            },
                            colors: [
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#fde79c'], [1, '#f6bc0c']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#b9d6f7'], [1, '#284b70']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#fbb7b5'], [1, '#702828']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#b8c0ac'], [1, '#5f7143']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#a9a3bd'], [1, '#382c6c']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#98c1dc'], [1, '#0271ae']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#9dc2b3'], [1, '#1d7554']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#b1a1b1'], [1, '#50224f']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#c1c0ae'], [1, '#706e41']] },
                                { radialGradient: {cx: 0, cy: 0, r: 1, gradientUnits: 'objectBoundingBox'}, stops: [[0, '#adbdc0'], [1, '#446a73']] }
                            ],
                            title: {
                                text: scope.name,
                                align: 'left',
                                style: {
                                    color: '#000000',
                                    font: '16px Aller',
                                    fontWeight: 'bold'
                                },
                                floating: true,
                                x: 0,
                                y: 10
                            },
                            subtitle: {
                                text: scope.subtitle,
                                align: 'left',
                                verticalAlign: 'bottom',
                                style: {
                                    font: 'italic 11px Aller',
                                    color: '#3F3F3F'
                                },
                                floating: true,
                                x: 0,
                                y: 4
                            },
                            credits: {
                                enabled: false
                            },
                            tooltip: {
                                enabled: false
                            },
                            plotOptions: {
                                pie: {
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false  // disable labels on each pie
                                    },
                                    shadow: false,
                                    borderColor: 'none',
                                    size: '95%',
                                    point: {
                                        events: {
                                            mouseOver: function(e) {
                                                var row = document.getElementById(e.currentTarget.id);

                                                if (scope.renderComplete) {
                                                    utilities.appendClass(row, 'selected');
                                                    animateSlice(this, true);
                                                }
                                                scope.setHoveredAccount(this);
                                            },
                                            mouseOut: function(e) {
                                                var row = document.getElementById(e.currentTarget.id);

                                                if (scope.renderComplete) {
                                                    utilities.clearClass(row, 'selected');
                                                    animateSlice(this, false);
                                                }
                                                scope.unSetHoveredAccount();
                                            },
                                            click: function(e) {
                                                var slice = e.currentTarget;

                                                if (slice.series.name === 'All Accounts') {
                                                    scope.chartTitle = slice.name;
                                                    utilities.triggerClick( document.getElementById(slice.id) );
                                                    clearSelectedRow('tr.account-row.selected');
                                                } else {
                                                    scope.chartTitle = 'All Accounts';
                                                    utilities.triggerClick( document.getElementById('viewAccounts') );
                                                    clearSelectedRow('tr.account-row.selected');
                                                }
                                            }
                                        }
                                    }
                                },
                                series: {
                                    animation: {
                                        duration: 700,
                                        complete: function(){
                                            options.custom.seriesLoaded++;

                                            if (options.custom.seriesLoaded === scope.data.length) {
                                                scope.renderComplete = true;
                                                options.custom.seriesLoaded = 0;
                                            }

                                        }
                                    }
                                }
                            },
                            series: [{
                                type: scope.type,
                                name: scope.name,
                                data: scope.data
                            }]
                        },
                        pieChart = $$element.highcharts() || null,
                        noData = scope.data === undefined ? true : false,
                        unbindWatcher = null;
                    
                    // If no data don't draw a blank chart
                    if (noData) {
                        return;
                    }

                    if (pieChart !== null) {
                        // Reset loading boolean
                        scope.renderComplete = false;
                        
                        // Update data
                        pieChart.series[0].remove(false);   
                        pieChart.addSeries(options.series[0]);

                        // Set title and subtitle
                        pieChart.setTitle({
                                // title
                                text: scope.name
                            }, {
                                // subtitle
                                text: scope.subtitle
                            });

                    } else {
                        // Create chart
                        $$element.highcharts(options);

                        // Bind watcher
                        unbindWatcher = initHighlightWatch($$element.highcharts());
                    }
                });
            }
        };
    });