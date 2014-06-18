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
            dest = this.data.dest;

        if (typeof dest !== 'string') {
            grunt.fatal('Target must be configured with a `dest` dir path.');
        }

        if (grunt.file.isDir(dest)) {
            grunt.warn('Directory "' + dest + '" already exists.');
        }

        var tree    = loadBrocfile(),
            builder = new broccoli.Builder(tree);

        grunt.log.writeln('Broccoli building to "' + dest + '"');

        builder.build().then(function (results) {
            // Deal with differences in Broccoli versions.
            var dir = typeof results === 'string' ? results : results.directory;

            var buildTime = results.totalTime;

            ncp(dir, dest, function (err) {
                if (err) { throw err; }

                if (buildTime) {
                    grunt.log.ok('built (' + Math.floor(buildTime / 1e6) + 'ms)');
                } else {
                    grunt.log.ok('built');
                }

                builder.cleanup();
                done();
            });
        }).catch(done);
    });
};
