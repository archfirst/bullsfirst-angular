/**
 * Created by vgoya2 on 10/28/13.
 */

describe('Login', function () {
    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.get('http://localhost:63342/bullsfirst-angular/app/index.html')

    });

    it('should request', function () {
        ptor = protractor.getInstance();
        ptor.findElements(protractor.By.input('user.username')).sendKeys('vg1');
        ptor.findElements(protractor.By.input('user.password')).sendKeys('vg1');
        ptor.findElements(protractor.By.css('a.login-button')).click();

        expect(ptor.getCurrentUrl()).toContain('accounts');
    });
});