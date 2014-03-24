'use strict';

module.exports = function (broccoli) {
    var env       = require('broccoli-env').getEnv(),
        pickFiles = require('broccoli-static-compiler');

    var assets = broccoli.makeTree('test/fixtures/');

    // Simple example of doing something different in production build.
    if (env === 'production') {
        return pickFiles(assets, {
            srcDir : '/',
            destDir: 'css',
            files  : ['**/*.css']
        });
    }

    // Simple example of doing something different in development build.
    if (env === 'development') {
        return pickFiles(assets, {
            srcDir : '/',
            destDir: 'js',
            files  : ['**/*.js']
        });
    }
};
