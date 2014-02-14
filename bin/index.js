#!/usr/bin/env node
'use strict';
var program = require('commander');
var pkg = require('../package');
var bin = {};
var ctx = {};

bin.install = require('./install');

program
  .version('0.0.1')
  .option('-i, --install [path]', 'Install a new application based on scaffolding.')
  .parse(process.argv);

if (program.install) {
  ctx.cwd = process.cwd();
  bin.install.call(ctx, process.install);
}
