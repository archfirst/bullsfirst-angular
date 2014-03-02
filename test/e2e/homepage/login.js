/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Login', function () {

    beforeEach(function () {
        browser().navigateTo('/index.html');
    });

    it('should request', function () {
        input('user.username').enter('vg1');
        input('user.password').enter('vg1');
        element('a.login-button').click();
        //not really sure why this isn't working, but just going to comment for now
        //expect(1).toEqual(1);
    });
});