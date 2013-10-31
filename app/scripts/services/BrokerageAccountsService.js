/**
 * Created by vgoya2 on 10/28/13.
 */

angular.module('bullsfirst')
    .factory('BrokerageAccountsService', function ($resource, OMSUrl, BASE64) {
        'use strict';

        return $resource(OMSUrl + '/secure/brokerage_accounts');
    });