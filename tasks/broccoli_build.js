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
            ncp      = require('ncp'),
            findup   = require('findup-sync'),
            path     = require('path');

        var done = this.async(),
            dest = this.data.dest;

        var loadBrocfile = function(brocfileName) {
            var brocfile = findup(brocfileName || 'Brocfile.js', {nocase: true});
            if (brocfile == null) { throw new Error('Brocfile.js not found'); }
            var baseDir = path.dirname(brocfile);
            process.chdir(baseDir);
            var tree = require(brocfile);
            return tree;
        };

        if (typeof dest !== 'string') {
            grunt.fatal('Target must be configured with a `dest` dir path.');
        }

        if (grunt.file.isDir(dest)) {
            grunt.warn('Directory "' + dest + '" already exists.');
        }

        var tree    = loadBrocfile(this.data.brocfile),
            builder = new broccoli.Builder(tree);

        grunt.log.writeln('Broccoli building to "' + dest + '"');

        builder.build().then(function (results) {
            // Deal with differences in Broccoli versions.
            var dir = typeof results === 'string' ? results : results.directory;

            var buildTime = results.totalTime;

            ncp(dir, dest, {dereference: true}, function (err) {
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
