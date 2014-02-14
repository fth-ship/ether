'use strict';
var path = require('path');

function binInstallHandler(filepath) {
  var self = this;
  var filepath = (filepath || 'etherfile.js');
  var fileLocation = path.resolve(self.cwd, filepath);
  var load = require(fileLocation);

  load.make('default');

  return self;
}
module.exports = exports = binInstallHandler;
