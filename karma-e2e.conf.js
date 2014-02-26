// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['ng-scenario'],

        // list of files / patterns to load in the browser
        files: [
            'test/e2e/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // Uncomment the following lines if you are using grunt's server to run the tests
        proxies: {
            // NOTE I'm not sure if there's another way to do this. I couldn't figure one out...
            '/': 'http://bullsfirst/app/',
            '/app/views/directives/': 'http://bullsfirst/app/views/directives/',
            '/bfoms-javaee/rest/': 'http://archfirst.org/bfoms-javaee/rest/',
            '/bfexch-javaee/rest/': 'http://archfirst.org/bfexch-javaee/rest/'
        },

        // URL root prevent conflicts with the site root
        urlRoot: '_karma_'
    });
};
