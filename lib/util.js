'use strict';
var eutil = exports;
var fs = require('fs');

function loadFileHandler(pathList) {
  /* jshint validthis: true */
  /* jshint bitwise: false */
  var out = null;
  var whiteList = pathList.map(fs.existsSync);
  var idx = whiteList.indexOf(true);
  var hasIndexOfWhiteList = idx !== -1;

  if (hasIndexOfWhiteList) {
    out = pathList[idx];
  }

  return out;
}
eutil.loadFile = loadFileHandler;
