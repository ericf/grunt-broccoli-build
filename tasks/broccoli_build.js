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
            ncp      = require('ncp');

        // Deal with differences in Broccoli versions.
        var loadBrocfile = typeof broccoli.loadBrocfile === 'function' ?
                broccoli.loadBrocfile :
                broccoli.helpers.loadBrocfile;

        var done = this.async(),
            dest = this.data.dest,
            env  = this.data.env || 'development';

        if (typeof dest !== 'string') {
            grunt.fatal('Target must be configured with a `dest` dir path.');
        }

        process.env['BROCCOLI_ENV'] = env;

        var tree    = loadBrocfile(),
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
