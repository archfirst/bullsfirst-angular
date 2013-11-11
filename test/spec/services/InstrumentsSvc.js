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
 * Instruments service test
 *
 * @authors
 * Vikas Goyal
 */

describe('Services: InstrumentsService', function () {
    'use strict';

    var $httpBackend,
        InstrumentsSvc,
        authorizationHeader,
        url,
        marketPricesUrl,
        $rootScope;

    beforeEach(module('bullsfirst'));

    beforeEach(inject(function (_$httpBackend_, _InstrumentsSvc_, BASE64, ExchangeUrl, _$rootScope_) {
        authorizationHeader = BASE64.encode('wflintstone:cool');
        $rootScope = _$rootScope_;

        $rootScope.user = {
            firstName: 'User1',
            lastName: 'User1',
            AuthorizationHeader: authorizationHeader
        };

        url = ExchangeUrl + '/instruments';
        marketPricesUrl = ExchangeUrl + '/market_prices';
        InstrumentsSvc = _InstrumentsSvc_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/instruments.*?$/).respond(200);
        $httpBackend.whenGET(/market_prices.*?$/).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    //Get all instruments
    describe('Services: InstrumentsService #query', function () {
        it('should make a GET request to the Exchange server with correct authorization and parameters for all instruments', function () {
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            InstrumentsSvc.query();
            $httpBackend.flush();
        });
    });

    //Get an instrument
    describe('Services: InstrumentsService #get', function () {
        it('should make a GET request to the Exchange server with correct authorization and parameters for a selected instrument', function () {
            url += '/AAPL';
            $httpBackend.expectGET(url, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            InstrumentsSvc.get({instrumentSymbol: 'AAPL'});
            $httpBackend.flush();
        });
    });

    //Get market price of an instrument
    describe('Services: InstrumentsService #getMarketPrices', function () {
        it('should make a GET request to the Exchange server with correct authorization and parameters for a selected instrument', function () {
            marketPricesUrl += '/AAPL';
            $httpBackend.expectGET(marketPricesUrl, {
                Accept: 'application/json, text/plain, */*',
                Authorization: authorizationHeader
            });
            InstrumentsSvc.getMarketPrices({instrumentSymbol: 'AAPL'});
            $httpBackend.flush();
        });
    });




});