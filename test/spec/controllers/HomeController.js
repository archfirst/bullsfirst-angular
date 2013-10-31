'use strict';

describe('Controller: HomeController', function () {
    var HomeController,
        scope,
        userService,
        rootScope;

    // load the controller's module
    beforeEach(module('bullsfirst'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector, $resource) {
        userService = $injector.get('User');
        rootScope = $rootScope;
        scope = $rootScope.$new();

        HomeController = $controller('HomeController', {
            $scope: scope,
            $resource: $resource,
            userService: userService
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
            spyOn(userService, 'login');
            scope.login();
            expect(userService.login).toHaveBeenCalledWith({
                username: scope.user.username,
                password: scope.user.password
            }, jasmine.any(Function), jasmine.any(Function));
        });
    });

    describe('Controller: HomeController #openAccount', function () {
        it('should call UserService save method with correct user data', function () {
            spyOn(userService, 'save');
            scope.openAccount();
            expect(userService.save).toHaveBeenCalledWith(scope.user,
                jasmine.any(Function), jasmine.any(Function));
        });
    });

});