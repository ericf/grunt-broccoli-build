'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.broccoli_build = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  built_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('build_production/css/main.css');
    var expected = grunt.file.read('test/expected/css/main.css');
    test.equal(actual, expected, 'should have copied main.css to the build/ dir.');

    test.done();
  },
  build_js: function(test) {
    test.expect(1);

    var actual = grunt.file.read('build/js/app.js');
    var expected = grunt.file.read('test/expected/js/app.js');
    test.equal(actual, expected, 'should have copied app.js to the build/ dir.');

    test.done();
  },
};
