/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Services: BrokerageAccountsService', function () {
    'use strict';

    var $httpBackend,
        BrokerageAccountsService,
        authorizationHeader,
        url,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _BrokerageAccountsService_, BASE64, OMSUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = OMSUrl + '/secure/brokerage_accounts';
        BrokerageAccountsService = _BrokerageAccountsService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/brokerage_accounts$/).respond(200);
        $httpBackend.whenPOST(/brokerage_accounts$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: BrokerageAccountsSevice #get', function () {
        it('should make a GET request to the OMS server with correct authorization', function () {
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            BrokerageAccountsService.get();
            $httpBackend.flush();
        });
    });

    describe('Services: BrokerageAccountsSevice #save', function () {
        it('should make a POST request to the OMS server with correct authorization', function () {
            $httpBackend.expectPOST(url, {accountName: 'Brokerage Account 1'},  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            BrokerageAccountsService.save({
                accountName: 'Brokerage Account 1'
            });
            $httpBackend.flush();
        });
    });
});