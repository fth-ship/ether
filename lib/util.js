var eutil = exports;
var fs = require('fs');

function loadFileHandler(pathList) {
  var out = null;
  var whiteList = pathList.map(fs.existsSync);
  var idx = whiteList.indexOf(true);
  var hasIndexOfWhiteList = !!~idx;

  if ( hasIndexOfWhiteList ) {
    out = pathList[idx];
  }

  return out;
}
eutil.loadFile = loadFileHandler;
