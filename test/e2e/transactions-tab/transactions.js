/**
 * Created by szendeh
 */

describe('Login', function () {
    beforeEach(function () {
        browser().navigateTo('/index.html#transactions');
    });

    it('should allow user to pick start and end date, refine by account, and reset', function () {
        // enter start and end dates
        pause();
        input('filters.fromDate').enter('2013-05-01');
        input('filters.toDate').enter('2013-10-01');
        element('a.js-apply-filters-button').click();
        expect(repeater("table.transactions-table tbody tr").count()).toEqual(17);

        // refine by account
        select('filters.accountChoice').option('11');
        element('a.js-apply-filters-button').click();
        expect(repeater("table.transactions-table tbody tr").count()).toEqual(8);

        // woopsies, you picked the wrong date!
        input('filters.toDate').enter('2013-06-01');
        element('a.js-apply-filters-button').click();
        expect(repeater("table.transactions-table tbody tr").count()).toEqual(7);

        // ... and the wrong account!
        select('filters.accountChoice').option('');
        element('a.js-apply-filters-button').click();
        expect(repeater("table.transactions-table tbody tr").count()).toEqual(13);

        // ok, forget it, start over (click 'reset')
        element('a.js-reset-filters-button').click();
        expect(repeater("table.transactions-table tbody tr").count()).toEqual(0);
    });
});