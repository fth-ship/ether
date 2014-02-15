var ether = require('ether');
var nodeModule = ether({
  questions: [{
    type: 'input',
    name: 'name',
    message: 'Whats the name of the module?'
  }, {
    type: 'input',
    name: 'version',
    message: 'Whats the version of the module?'
  }, {
    type: 'input',
    name: 'entryPoint',
    message: 'What the entry point of the module?',
    default: 'index.js',
  }, {
    type: 'input',
    name: 'author',
    message: 'Who is the author of the module?'
  }, {
    type: '',
    name: 'public',
    message: 'This module is public?',
    default: true
  }],
  tree: [
    ['node-module'],
    ['node-module/bin'],
    ['node-module/lib'],
    ['node-module/examples'],
    ['node-module/test']
  ],
});

nodeModule.task('questions', function (doneHandler) {
  nodeModule.run('prompt', [nodeModule.get('questions'), doneHandler]);
});

nodeModule.task('build', function () {
  var self = this;

  self.get('tree').map(function (item) {
    self.run('mkdir', item);
  });

  return self;
});

nodeModule.task('seed', function () {
  var self = this;

  self
    .run('template', [
      './package.json',
      './node-module/package.json'
    ]);

  return self;
});

nodeModule.make('default', function () {
  var self = this;

  function doneHandler() {
    nodeModule.run('build');
    nodeModule.run('seed');
  }
  nodeModule.run('questions', [doneHandler]);

  return self;
});

module.exports = exports = nodeModule;
