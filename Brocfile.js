'use strict';

var mergeTrees = require('broccoli-merge-trees'),
    pickFiles  = require('broccoli-static-compiler');

var assets = 'test/fixtures/';

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

module.exports = mergeTrees([css, js]);
