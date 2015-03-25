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
        var broccoli = require('broccoli');
        var findup   = require('findup-sync');
        var ncp      = require('ncp');
        var path     = require('path');

        var done = this.async();
        var dest = this.data.dest;

        // TODO: Add upstream feature request to `broccoli` to support the:
        // `loadBrocfile([ name ])` signature so this functionality doesn't
        // have to be duplicated from Broccoli.
        function loadBrocfile(brocfileName) {
            var brocfile = findup(brocfileName || 'Brocfile.js', {nocase: true});

            if (!brocfile) {
                throw new Error('Brocfile.js not found');
            }

            // cwd into the Brocfile's dir so its deps are loaded correctly.
            process.chdir(path.dirname(brocfile));
            return require(brocfile);
        }

        if (typeof dest !== 'string') {
            grunt.fatal('Target must be configured with a `dest` dir path.');
        }

        if (grunt.file.isDir(dest)) {
            grunt.warn('Directory "' + dest + '" already exists.');
        }

        var tree    = loadBrocfile(this.data.brocfile);
        var builder = new broccoli.Builder(tree);

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

                builder.cleanup().then(done);
            });
        }).catch(done);
    });
};
