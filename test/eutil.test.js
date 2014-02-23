'use strict';
var eutil = require('../lib/util');
var path = require('path');
var assert = require('assert');
var util = require('util');

describe('Ether util', function () {
  it('load file', function () {
    var actual = eutil.loadFile([
      path.resolve('./case/src/template.txt'),
      path.resolve(__dirname, './case/src/template.txt'),
    ]);
    var expected = (actual !== null);

    assert.ok(expected);
  });

  it('load file fail', function () {
    var actual = eutil.loadFile([
      path.resolve('./case/src/template.txt'),
      path.resolve(__dirname, './test/case/src/template.txt'),
    ]);
    var expected = (actual === null);

    assert.ok(expected);
  });

  it('should be change arguments to array', function () {
    (function () {
      var actual = eutil.toArray(arguments);
      var expected = util.isArray(actual);
      var out = [1, 2, 3];

      assert.ok(expected);
      assert.deepEqual(actual, out);
    })(1, 2, 3);
  });

  it('should be arguments replaced by context', function () {
    var actual = eutil.args([
      '{{name}}/test'
    ], {
      name: 'hello'
    });
    var expected = ['hello/test'];

    assert.deepEqual(actual, expected);
  });
});
