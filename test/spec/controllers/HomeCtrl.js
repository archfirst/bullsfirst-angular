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
 * Home controller test
 *
 * @authors
 * Vikas Goyal
 */

'use strict';

describe('Controller: HomeController', function () {
    var HomeCtrl,
        scope,
        usersSvc,
        rootScope;

    // load the controller's module
    beforeEach(module('bullsfirst'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector, $resource) {
        usersSvc = $injector.get('UsersSvc');
        rootScope = $rootScope;
        scope = $rootScope.$new();
        scope.newUser = new usersSvc();

        HomeCtrl = $controller('HomeCtrl', {
            $scope: scope,
            $resource: $resource,
            UsersSvc: usersSvc
        });

        scope.user = {
            firstname: 'user1f',
            lastname: 'user1l',
            username: 'user1',
            password: 'password1'
        };
    }));
    
    describe('Controller: HomeController #processKeyPressAction', function () {
        it('should call login method when action is login', function () {
            spyOn(scope, 'login');
            scope.processKeyPressAction({keyCode: 13}, 'login');
            expect(scope.login).toHaveBeenCalled();
        });

        it('should call openAccount method when action is openaccount', function () {
            spyOn(scope, 'openAccount');
            scope.processKeyPressAction({keyCode: 13}, 'openaccount');
            expect(scope.openAccount).toHaveBeenCalled();
        });
    });

    describe('Controller: HomeController #login', function () {
        it('should call UserService login method', function () {
            spyOn(usersSvc, 'login');
            scope.login();
            expect(usersSvc.login).toHaveBeenCalledWith({
                username: scope.user.username,
                password: scope.user.password
            }, jasmine.any(Function));
        });
    });

    describe('Controller: HomeController #openAccount', function () {
        it('should call UserService save method with correct user data', function () {
            spyOn(scope.newUser, '$save');
            scope.openAccount();
            expect(scope.newUser.$save).toHaveBeenCalledWith(jasmine.any(Function));
        });
    });

});