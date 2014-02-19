'use strict';
var eutil = require('../lib/util');
var path = require('path');
var assert = require('assert');

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
});
