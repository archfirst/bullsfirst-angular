/**
 * Created by vgoya2 on 10/26/13.
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
        expect($route.current.controller).toBe('HomeController');
    });
});