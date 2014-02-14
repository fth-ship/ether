'use strict';
var ether = require('../');
var queue = require('../lib/queue');
var assert = require('assert');
var fs = require('fs');

describe('Ether', function () {
  var context = {
    name: 'TestCase'
  };
  var app = ether(context, queue);

  it('app banner', function (done) {
    app.run('initializer');
    done();
  });

  it('app mkdir', function (done) {
    app.run('mkdir', [
      './test/case/dst',
    ]);
    var expected = fs.existsSync('./test/case/dst');

    assert.ok(expected);
    done();
  });

  it('app copy', function (done) {
    app.run('copy', [
      './test/case/src/copy.txt',
      './test/case/dst/copy.txt'
    ]);
    var expected = fs.existsSync('./test/case/dst/copy.txt');

    assert.ok(expected);
    fs.unlinkSync('./test/case/dst/copy.txt');
    done();
  });

  after(function () {
    fs.rmdirSync('./test/case/dst');
  });
});
