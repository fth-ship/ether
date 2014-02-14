var ether = require('../');
var queue = require('../lib/queue');
var assert = require('assert');

describe('Ether', function () {
  var context = {
    name: 'TestCase'
  };
  var app = ether(context, queue);

  it('app banner', function (done) {
    app.run('initializer');
    done();
  });
});
