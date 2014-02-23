'use strict';
var eutil = exports;
var fs = require('fs');
var micro = require('micro-engine');

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

function toArrayHandler(args) {
  var out = args;

  out = Array.prototype.slice.call(args);

  return out;
}
eutil.toArray = toArrayHandler;

function argsHandler(args, ctx) {
  var out = args;

  function argsMapHandler(item) {
    return micro(item).compile(ctx);
  }
  out = args.map(argsMapHandler);

  return out;
}
eutil.args = argsHandler;
