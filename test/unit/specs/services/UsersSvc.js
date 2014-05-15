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
 * Users service test
 *
 * @authors
 * Vikas Goyal
 */

describe('Services: UsersService', function () {
    'use strict';

    var $httpBackend,
        usersService,
        OMSBaseUrl,
        url,
        createUserData = {
            firstName: 'user1F',
            lastName: 'user1L',
            username: 'user1',
            password: 'password1'
        };

    // Load bullsfirst module
    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($injector, $rootScope, OMSUrl) {
        usersService = $injector.get('UsersSvc');
        OMSBaseUrl = OMSUrl;
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Services: UsersService #login', function () {
        beforeEach(function () {
            url = OMSBaseUrl + '/users/user1';
            $httpBackend.whenGET(url).respond(200);
        });

        it('should call OMS server with correct url and headers', function () {
            $httpBackend.expectGET(url, {
                password: 'password1',
                Accept:'application/json, text/plain, */*'
            });
            usersService.login({username: 'user1', password: 'password1'});
            $httpBackend.flush();
        });
    });

    describe('Services: UsersService #save', function () {

        beforeEach(function () {
            url = OMSBaseUrl + '/users';
            $httpBackend.whenPOST(url, createUserData).respond(201);
        });

        it('should call OMS server with correct url and headers', function () {
            $httpBackend.expectPOST(url, createUserData);
            usersService.save(createUserData);
            $httpBackend.flush();
        });
    });
});