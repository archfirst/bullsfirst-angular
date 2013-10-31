/**
 * Created by vgoya2 on 10/25/13.
 */

describe('Services: UsersService', function () {
    'use strict';

    var $httpBackend,
        userService,
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
        userService = $injector.get('User');
        OMSBaseUrl = OMSUrl;
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Services: UsersService #login', function () {
        beforeEach(function () {
            url = OMSBaseUrl + '/users/user1?';
            $httpBackend.whenGET(url).respond(200);
        });

        it('should call OMS server with correct url and headers', function () {
            $httpBackend.expectGET(url, {
                password: 'password1',
                Accept:'application/json, text/plain, */*'
            });
            userService.login({username: 'user1', password: 'password1'});
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
            userService.save(createUserData);
            $httpBackend.flush();
        });
    });
});