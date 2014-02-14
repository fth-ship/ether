var queue = exports;
var pkg = require('../package');

function initializerHandler() {
  var self = this;
  var sep = (new Array(35)).join('=');
  var tab = (new Array(4)).join(' ');
  var banner = [
    sep, '\n',
    tab, 'Welcome to The Ether v', pkg.version, '\n',
    tab, 'Let\'s get started...', '\n',
    sep,
  ].join('');

  console.log(banner);

  return self;
}
queue.initializer = initializerHandler;
