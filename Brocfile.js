'use strict';

module.exports = function (broccoli) {
    var pickFiles = require('broccoli-static-compiler');

    var assets = broccoli.makeTree('test/fixtures/');

    var env = require('broccoli-env').getEnv();


    if (env === 'production') {
      var css = pickFiles(assets, {
          srcDir : '/',
          destDir: 'css',
          files  : ['**/*.css']
      });

      return [css];
    }

    if (env === 'development') {
      var js = pickFiles(assets, {
          srcDir : '/',
          destDir: 'js',
          files  : ['**/*.js']
      });

      return [js];
    }
};
