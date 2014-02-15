# Ether

## Description

Ether is a simple tool to make scaffolding easy, and fun in
a programmatic way.

## Installation

  ```
  [sudo] npm i ether
  ```

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

## Ether file

### Install the cli

  ```shell
  [sudo] npm i -g ether
  ```

  Use the cli tool, to run scaffolding, to generate new applications.

### Use the '--install' option

  ```shell
  ether -i // this instruction read the etherfile.js
  ```

  The install option use the `etherfile.js` or and module installed.

### Global scaffolding

  ```shell
  [sudo] npm i -g ether-gen
  ```

  and

  ```shell
  ether -i ether-gen
  ```

  Or using this way to install one scaffolding from npm,
  and run this scaffolding app.

### Trick

  To make module runnable, use the bunch `default` in the `make`,
  method defining and running by the way.

[WIP]

Created by Kaique da Silva <kaique.developer@gmail.com>
