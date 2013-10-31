/**
 * Created by vgoya2 on 10/28/13.
 */

angular.module('bullsfirst')
    .factory('AccountsService', function ($resource, OMSUrl) {
        'use strict';

        return $resource(OMSUrl + '/secure/accounts/:accountId/:action', {}, {
            changeName: {
                method: 'POST',
                params: {
                    action: 'change_name'
                }
            },
            transferCash: {
                method: 'POST',
                params: {
                    action: 'transfer_cash'
                }
            },
            transferSecurities: {
                method: 'POST',
                params: {
                    action: 'transfer_securities'
                }
            }
        });
    });