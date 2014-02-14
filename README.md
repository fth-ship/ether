# Ether

## Description

Ether is a simple tool to make scaffolding easy, and fun in
a programmatic way.

## Installation

  [sudo] npm i ether

## API

### Instance

  var app = ether({
    name: 'Example'
  });

### Get and Set

  app.get('name');

  and

  app.set('version', '0.0.1');

### Task

  app.task('create-app-structure', function () {
    app.mkdir('app/');
    app.mkdir('app/models');
    app.mkdir('app/views');
    app.mkdir('app/controllers');
  });

### Run

  app.run('create-app-structure');

### Make

  app.make('default', function () {
    app.run('create-app-structure');
  });

### Make run

  app.make('default');

## Ether file

### Install the cli

  [sudo] npm i -g ether

### Use the '--install' option

  ether -i // this instruction read the etherfile.js

### Global scaffolding

  sudo npm i -g ether-gen

  ether -i ether-gen

[WIP]
