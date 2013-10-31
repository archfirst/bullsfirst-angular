/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Login', function () {

    beforeEach(function () {
        browser().navigateTo('/bullsfirst-angular/app/index.html#/');
    });

    it('should request', function () {
        input('user.username').enter('vg1');
        input('user.password').enter('vg1');
        element('a.login-button').click();
        expect(1).toEqual(1);
    });
});