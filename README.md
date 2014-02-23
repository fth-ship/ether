# Ether

## Status

[![Build Status](https://travis-ci.org/fth-ship/ether.png?branch=master)](https://travis-ci.org/fth-ship/ether)

## Description

Ether is a simple tool to make scaffolding easy, and fun in
a programmatic way.

## Installation

  ```
  [sudo] npm i ether
  ```

## Ether file

### Example

  ```javascript
  'use strict';
  var path = require('path');
  var ether = require('ether');
  var nodeModule = ether({
    questions: [{
      type: 'input',
      name: 'name',
      message: 'Whats the name of the module?'
    }, {
      type: 'input',
      name: 'version',
      message: 'Whats the version of the module?',
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'entryPoint',
      message: 'What the entry point of the module?',
      default: 'index.js',
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of the module?'
    }, {
      type: '',
      name: 'public',
      message: 'This module is public?',
      default: true
    }],
    tree: [
      ['{{name}}'],
      ['{{name}}/bin'],
      ['{{name}}/lib'],
      ['{{name}}/examples'],
      ['{{name}}/test']
    ],
  });

  nodeModule.task('questions', function (doneHandler) {
    nodeModule.run('prompt', [nodeModule.get('questions'), doneHandler]);
  });

  nodeModule.task('build', function () {
    var self = this;

    self.get('tree').map(function (item) {
      self.run('mkdir', item);
    });

    return self;
  });

  nodeModule.task('seed', function (cb) {
    var self = this;

    self
      .run('download', [
        'https://gist.github.com/kaiquewdev/9087288/raw/b7d70fc5e3aad9e04b6549bc4239f38f1149af5c/ether-package.json',
        './{{name}}/package.json'),
        cb
      ]);

    return self;
  });

  nodeModule.make('default', function () {
    var self = this;

    function doneHandler() {
      nodeModule.run('build');
      nodeModule.run('seed', [function () {
        console.log('Download was completed and template too.');
      }]);
    }
    nodeModule.run('questions', [doneHandler]);

    return self;
  });

  module.exports = exports = nodeModule;
  ```

### Install the cli

  ```shell
  [sudo] npm i -g ether
  ```

  Use the cli tool, to run scaffolding, to generate new applications.

### Use the '--install' option

  ```shell
  ether -i etherfile.js
  ```

  The install option use the `etherfile.js` or and module installed.

## To run make tasks registered in the etherfile use

  ```shell
  ether -u [etherfile] -m [task-name]
  ```

### Global scaffolding

  ```shell
  [sudo] npm i -g ether-node-module
  ```

  and

  ```shell
  ether -i ether-node-module

  or

  ether -i node_modules/ether-node-module
  ```

  Or using this way to install one scaffolding from npm,
  and run this scaffolding app.

## API

### Instance

  ```javascript
  var app = ether({
    name: 'Example'
  });
  ```

  Instantiation of the scaffolding.

### Get and Set

  ```javascript
  app.get('name');
  ```

  and

  ```javascript
  app.set('version', '0.0.1');
  ```

  Get and Set, modify the context of the instance.

### Task

  ```javascript
  app.task('create-app-structure', function () {
    app.run('mkdir', ['app/'])
       .run('mkdir', ['app/models'])
       .run('mkdir', ['app/views'])
       .run('mkdir', ['app/controllers']);
  });
  ```

  using the `task` method you can create new methods to reuse in the instance,
  of the current scaffolding app.

#### Default tasks

##### Mkdir

  ```javascript
  app.run('mkdir', [destiny]);
  ```

  On the destiny dir, this task create an new directory

#### Copy

  ```javascript
  app.run('copy', [source, destiny]);
  ```

  That task make a copy of an file

#### Template

  ```javascript
  app.run('template', [source, destiny]);
  ```

  This task make a copy and replace variables
  from context of the instance of the scaffolding,
  to another new file.

#### Prompt

  ```javascript
  app.run('prompt', [[{type:'input', name: 'name', message: 'Whats the name of that application?'}]]);
  ```

  To put variables using the interactive mode in the context of the instance,
  use this method.

#### Download

  ```javascript
  app.run('download', [url, destiny, callback]);
  ```

  To make download of an file and put in the project replacing,
  variables.

### Run

  ```javascript
  app.run('create-app-structure');
  ```

  This method run tasks previously defined.

### Make

  ```javascript
  app.make('default', function () {
    app.run('create-app-structure');
  });
  ```

  The `make` method can register a bunch of tasks.

### Make run

  ```javascript
  app.make('default');
  ```

  And run a bunch of tasks.

## Note

[WIP]

Created by Kaique da Silva <kaique.developer@gmail.com>
