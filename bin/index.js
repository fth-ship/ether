#!/usr/bin/env node
'use strict';
var program = require('commander');
var pkg = require('../package');
var path = require('path');
var ether = require('./');
var sudoBlock = require('sudo-block');
var bin = {};
var ctx = {};

global.ether = ether;

bin.install = require('./install');
bin.make = require('./make');

program
  .version('0.0.1')
  .option('-i, --install [path]', 'Install a new application based on scaffolding.')
  .option('-u, --use [path]', 'Use a ether module')
  .option('-m, --make [name]', 'Make run a task')
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
