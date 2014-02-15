'use strict';
var path = require('path');

function binInstallHandler(filepath) {
  var self = this;
  var filepath = (filepath || 'etherfile.js');
  var fileLocation = path.resolve(self.cwd, filepath);
  var hasFileLocation = (fs.existsSync(fileLocation));
  var load = (hasFileLocation ? fileLocation : filePath);

  load = require(load);

  load
    .run('initializer')
    .make('default');

  return self;
}
module.exports = exports = binInstallHandler;
