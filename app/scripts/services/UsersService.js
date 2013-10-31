/**
 * Created by vgoya2 on 10/23/13.
 */

angular.module('bullsfirst')
    .factory('User', function ($resource, OMSUrl) {
        'use strict';

        return $resource( OMSUrl + '/users', {}, {
            login: {
                method: 'GET',
                url: OMSUrl + '/users/:username'
            }
        });
    });