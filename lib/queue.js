'use strict';
var queue = exports;
var fs = require('fs');
var path = require('path');
var micro = require('micro-engine');
var pkg = require('../package');
var inquirer = require('inquirer');
var superagent = require('superagent');

function initializerHandler() {
  var self = this;
  var sep = (new Array(35)).join('=');
  var tab = (new Array(4)).join(' ');
  var banner = [
    sep, '\n',
    tab, 'Welcome to The Ether v', pkg.version, '\n',
    tab, 'Let\'s get started...', '\n',
    sep, '\n'
  ].join('');

  console.log(banner);

  return self;
}
queue.initializer = initializerHandler;

function mkdirHandler(dir) {
  var self = this;

  dir = path.resolve(process.cwd(), dir);
  fs.mkdirSync(dir);

  return self;
}
queue.mkdir = mkdirHandler;

function copyHandler(src, dst) {
  var self = this;

  src = path.resolve(process.cwd(), src);
  dst = path.resolve(process.cwd(), dst);

  fs.linkSync(src, dst);

  return self;
}
queue.copy = copyHandler;

function templateHandler(src, dst, fn) {
  var self = this;
  var fn = (fn || function completeHandler() {});
  var fileSrc = path.resolve(process.cwd(), src);
  var content = fs.readFileSync(fileSrc, 'utf-8');
  var fileDst = path.resolve(process.cwd(), dst);
  var streamDst = fs.createWriteStream(fileDst);
  var streamContent = micro(content).compile(self.context);

  streamDst.write(streamContent);
  fn();

  return self;
}
queue.template = templateHandler;

function promptHandler(questions, fn) {
  var self = this;
  var fn = (fn || function callbackPrompt(){});

  function inquirerPromptHandler(answers) {
    for (var k in answers) {
      self.set(k, answers[k]);
    }
    fn();
  }
  inquirer.prompt(questions, inquirerPromptHandler);

  return self;
}
queue.prompt = promptHandler;

function downloadHandler(src, dst, fn) {
  var self = this;
  var callback = (fn || function callbackDownloadHandler() {});
  var streamPath = path.resolve(process.cwd(), dst);
  var streamDst = fs.createWriteStream(streamPath);

  function completeHandler() {
    self.run('template', [streamPath, dst, fn]);
  }
  superagent
    .get(src)
    .pipe(streamDst)
    .on('close', completeHandler);

  return self;
}
queue.download = downloadHandler;
