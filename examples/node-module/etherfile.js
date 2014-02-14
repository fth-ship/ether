var ether = require('ether');
var nodeModule = ether({
  name: 'Node Module Example',
  version: '0.0.1',
  entryPoint: 'index.js',
  author: 'Kaique da Silva <kaique.developer@gmail.com>',
  public: true,
  tree: [
    ['node-module'],
    ['node-module/bin'],
    ['node-module/lib'],
    ['node-module/examples'],
    ['node-module/test']
  ],
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

nodeModule.make('create', function () {
  var self = this;

  self
    .run('build')
    .run('seed');

  return self;
});

nodeModule.make('default', function () {
  var self = this;

  self.make('create');

  return self;
});

module.exports = exports = nodeModule;
