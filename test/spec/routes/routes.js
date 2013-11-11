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
 * routes test
 *
 * @authors
 * Vikas Goyal
 */

describe('Routes', function () {
    'use strict';

    var $route,
        $location,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$route_, _$location_, _$rootScope_, $httpBackend) {
        $route = _$route_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $httpBackend.whenGET(/open-account/).respond(200);
    }));

    it('should have default route in the beginning', function () {
        expect($route.current).toBeUndefined();
    });

    it('should redirect index.html to index.html/openaccount', function () {
        $location.path('/openaccount');
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe('views/home/open-account.html');
        expect($route.current.controller).toBe('HomeCtrl');
    });
});