# Ether

## Description

Ether is a simple tool to make scaffolding easy, and fun in
a programmatic way.

## Installation

  [sudo] npm i ether

## API

### Instance

  ```javascript
  var app = ether({
    name: 'Example'
  });
  ```

### Get and Set

  ```javascript
  app.get('name');
  ```

  and

  ```javascript
  app.set('version', '0.0.1');
  ```

### Task

  ```javascript
  app.task('create-app-structure', function () {
    app.run('mkdir', ['app/'])
       .run('mkdir', ['app/models'])
       .run('mkdir', ['app/views'])
       .run('mkdir', ['app/controllers']);
  });
  ```

#### Default tasks

  app.run('mkdir', [destiny]);
  app.run('copy', [source, destiny]);
  // using the context of get and set and first object
  app.run('template', [source, destiny]);

### Run

  ```javascript
  app.run('create-app-structure');
  ```

### Make

  ```javascript
  app.make('default', function () {
    app.run('create-app-structure');
  });
  ```

### Make run

  ```javascript
  app.make('default');
  ```

## Ether file

### Install the cli

  [sudo] npm i -g ether

### Use the '--install' option

  ether -i // this instruction read the etherfile.js

### Global scaffolding

  sudo npm i -g ether-gen

  ether -i ether-gen

[WIP]
