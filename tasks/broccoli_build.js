/*
 * grunt-broccoli-build
 * https://github.com/ericf/grunt-broccoli-build
 *
 * Copyright 2014 Yahoo! Inc.
 * Licensed under the Yahoo! Inc. BSD license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('broccoli_build', 'Runs a Broccoli build.', function () {
        var broccoli = require('broccoli'),
            ncp      = require('ncp').ncp;

        var done = this.async(),
            dest = this.data.dest || 'build',
            env  = this.data.env || 'development';

        process.env['BROCCOLI_ENV'] = env;

        var tree    = broccoli.loadBrocfile(),
            builder = new broccoli.Builder(tree);

        grunt.log.write('Broccoli building to "' + dest + '"...');

        builder.build().then(function (dir) {
            if (grunt.file.isDir(dest)) {
                throw new Error('Directory "' + dest + '" already exists.');
            }

            ncp(dir, dest, function (err) {
                if (err) { throw err; }
                grunt.log.ok();
                done();
            });
        }).catch(done);
    });
};
