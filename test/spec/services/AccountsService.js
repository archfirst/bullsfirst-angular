/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Services: AccountsService', function () {
    'use strict';

    var $httpBackend,
        AccountsService,
        authorizationHeader,
        url,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _AccountsService_, BASE64, OMSUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = OMSUrl + '/secure/accounts/1234/';
        AccountsService = _AccountsService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/brokerage_accounts$/).respond(200);
        $httpBackend.whenPOST(/change_name$|transfer_cash$|transfer_securities$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Services: AccountsSevice #changeName', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'change_name';
            $httpBackend.expectPOST(url, {newName: 'Brokerage Account 1'},  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsService.changeName({accountId: 1234}, {
                newName: 'Brokerage Account 1'
            });
            $httpBackend.flush();
        });
    });

    describe('Services: AccountsSevice #transferCash', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'transfer_cash';
            var postData = {
                amount: {
                    amount: 1000.00,
                    currency: 'USD'
                },
                toAccountId: 5678
            };
            $httpBackend.expectPOST(url, postData,  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsService.transferCash({accountId: 1234}, postData);
            $httpBackend.flush();
        });
    });

    describe('Services: AccountsSevice #transferSecurities', function () {
        it('should make a POST request to the OMS server with correct authorization and parameters', function () {
            url += 'transfer_securities';
            var postData = {
                symbol: 'CSCO',
                quantity: 1000,
                pricePaidPerShare: {
                    amount: 19.23,
                    currency: 'USD'
                },
                toAccountId: 5678
            };
            $httpBackend.expectPOST(url, postData,  {
                Accept: 'application/json, text/plain, */*',
                'Content-Type':'application/json;charset=utf-8',
                Authorization: authorizationHeader
            });
            AccountsService.transferSecurities({accountId: 1234}, postData);
            $httpBackend.flush();
        });
    });
});