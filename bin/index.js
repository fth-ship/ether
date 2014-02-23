#!/usr/bin/env node
'use strict';
var program = require('commander');
var pkg = require('../package');
var path = require('path');
var ether = require('./');
var sudoBlock = require('sudo-block');
var help = require('./doc/bin/help');
var bin = {};
var ctx = {};

global.ether = ether;

bin.install = require('./install');
bin.make = require('./make');

program
  .version('0.0.1')
  .option(help.install.usage, help.install.description)
  .option(help.use.usage, help.use.description)
  .option(help.make.usage, help.make.usage)
  .parse(process.argv);

sudoBlock();

if (program.install || (program.user)) {
  ctx.cwd = process.cwd();
  bin.install.call(ctx, program.install);
} else if (program.use && (program.make)) {
  ctx.cwd = process.cwd();
  bin.make.call(ctx, program.user, program.make);
}

module.exports = exports = bin;
