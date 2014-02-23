'use strict';
var ether = require('../');
var queue = require('../lib/queue');
var assert = require('assert');
var fs = require('fs');
var server = require('./case/server');

describe('Ether', function () {
  var context = {
    name: 'TestCase',
    dstName: 'dst',
    copyFileName: 'copy.txt',
    templateFileName: 'template.txt',
    downloadFileName: 'download.txt',
  };
  var app = ether(context);

  server.listen(3000);

  it('app banner', function (done) {
    app.run('initializer');
    done();
  });

  it('app mkdir', function (done) {
    app.run('mkdir', [
      './test/case/{{dstName}}',
    ]);
    var expected = fs.existsSync('./test/case/dst');

    assert.ok(expected);
    done();
  });

  it('app copy', function (done) {
    app.run('copy', [
      './test/case/src/{{copyFileName}}',
      './test/case/dst/{{copyFileName}}'
    ]);
    var expected = fs.existsSync('./test/case/dst/copy.txt');

    assert.ok(expected);
    fs.unlinkSync('./test/case/dst/copy.txt');
    done();
  });

  it('app template', function (done) {
    app.run('template', [
      './test/case/src/{{templateFileName}}',
      './test/case/dst/{{templateFileName}}'
    ]);
    var expected = fs.existsSync('./test/case/dst/template.txt');

    assert.ok(expected);
    done();
  });

  it('app template content', function (done) {
    var actual = fs.readFileSync('./test/case/dst/template.txt', 'utf-8');
    var expected = (actual === 'Hello from TestCase\n');

    assert.ok(expected);
    fs.unlinkSync('./test/case/dst/template.txt');
    done();
  });

  it('app download', function (done) {
    function completeHandler() {
      var expected = fs.existsSync('./test/case/dst/download.txt');
      assert.ok(expected);
      done();
    }
    app.run('download', [
      'http://localhost:3000',
      './test/case/dst/{{downloadFileName}}',
      completeHandler
    ]);
  });

  it('app download content', function (done) {
    var actual = fs.readFileSync('./test/case/dst/download.txt', 'utf-8');
    var expected = (actual === 'Hello from TestCase');

    assert.ok(expected);
    fs.unlinkSync('./test/case/dst/download.txt');
    done();
  });

  it('should be the context replaced in mkdir', function () {
    app.set('testDir', 'test-dir');
    app.run('mkdir', ['./test/case/dst/{{testDir}}']);

    var expected = fs.existsSync('./test/case/dst/test-dir');

    assert.ok(expected);
    fs.rmdirSync('./test/case/dst/test-dir');
  });

  after(function () {
    fs.rmdirSync('./test/case/dst');
  });
});
