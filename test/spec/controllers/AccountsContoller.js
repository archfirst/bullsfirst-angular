/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Controller: AccountsController', function () {
    'use strict';

    var AccountsController,
        scope,
        brokerageAccountService,
        accountsService;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function ($controller, $rootScope, BrokerageAccountsService, AccountsService) {
        scope = $rootScope.$new();
        brokerageAccountService = BrokerageAccountsService;
        accountsService = AccountsService;

        AccountsController = $controller('AccountsController', {
            $scope: scope,
            brokerageAccountService: BrokerageAccountsService
        });

    }));
    
    describe('Controller: AccountsController #brokerageAccounts', function () {
        it('should call BrokerageAccountService`s query method', function () {
            spyOn(brokerageAccountService, 'query');
            var brokerageAccounts = scope.brokerageAccounts;
            expect(brokerageAccountService.query).toHaveBeenCalled();
        });
    });

    describe('Controller: AccountsController #changeAccountName', function () {
        it('should call AccountService`s changeName method', function () {
            spyOn(accountsService, 'changeName');
            scope.changeAccountName(1234, 'test');
            expect(accountsService.changeName).toHaveBeenCalledWith({accountId: 1234}, {newName: 'test'});
        });
    });


});