'use strict';

function binInstallHandler(filepath) {
  /* jshint validthis: true */
  var self = this;
  var fs = require('fs');
  var path = require('path');
  var filePath = (filepath || 'etherfile.js');
  var fileLocation = path.resolve(self.cwd, filePath);
  var hasFileLocation = fs.existsSync(fileLocation);
  var fileLocationPath = (hasFileLocation ? fileLocation : filePath);
  var load = require(fileLocationPath);

  load
    .run('initializer')
    .make('default');

  return self;
}
module.exports = exports = binInstallHandler;
