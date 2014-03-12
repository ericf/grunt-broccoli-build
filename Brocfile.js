'use strict';

module.exports = function (broccoli) {
    var pickFiles = require('broccoli-static-compiler');

    var assets = broccoli.makeTree('test/fixtures/');

    var css = pickFiles(assets, {
        srcDir : '/',
        destDir: 'css',
        files  : ['**/*.css']
    });

    var js = pickFiles(assets, {
        srcDir : '/',
        destDir: 'js',
        files  : ['**/*.js']
    });

    return [css, js];
};
