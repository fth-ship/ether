var ether = require('../');
var assert = require('assert');

describe('Ether', function () {
  var app = ether({
    name: 'TestCase'
  }, queue);

  it('app get name', function () {
    var actual = app.get('name');
    var expected = (actual === 'TestCase');

    assert.ok(expected);
  });

  it('app set version', function () {
    app.set('version', '0.0.1');
    var actual = app.get('version');
    var expected = (actual === '0.0.1');

    assert.ok(expected);
  });

  it('app has version', function () {
    var actual = app.has('version');

    assert.ok(actual);
  });

  it('app has not tree', function () {
    var actual = app.has('tree');

    assert.ok(!actual);
  });

  it('register a task', function () {
    app.task('sum', function (a, b) {
      return a + b;
    });
    var actual = app.run('sum', [1, 2]);
    var expected = (actual === 3);

    assert.ok(expected);
  });
});
