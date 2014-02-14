'use strict';
function loadContext(context) {
  var self = this;

  self.context = {};

  for (var i in context) {
    self.set(i, context[i]);
  }

  return self;
}

function loadQueue(queue) {
  var self = this;

  self.queue = {};

  for (var i in queue) {
    self.task(i, queue[i]);
  }

  return self;
}

function loadCircuit(circuit) {
  var self = this;

  self.circuit = {};

  return self;
}

function etherMainHandler(context, queue, circuit) {
  var self = this;

  loadContext.call(self, context);
  loadQueue.call(self, queue);
  loadCircuit.call(self, circuit);

  return self;
}

function etherHandler() {
  var self = this;

  return etherMainHandler.bind(self);
}
var Ether = etherHandler;

function etherGetHandler(key, value) {
  var self = this;
  var out = (value || null);

  out = (self.context[key] || value);

  return out;
}
Ether.prototype.get = etherGetHandler;

function etherSetHandler(key, value) {
  var self = this;

  self.context[key] = value;

  return self;
}
Ether.prototype.set = etherSetHandler;

function etherHasHandler(key) {
  var self = this;
  var out = false;
  var contextKeys = Object.keys(self.context);
  var hasKey = !!(~contextKeys.indexOf(key));

  key = (key || null);

  if (key) {
    out = hasKey;
  }

  return out;
}
Ether.prototype.has = etherHasHandler;

function etherTaskRegisterHandler(name, task) {
  var self = this;

  name = (name || null);
  task = (task || function nullTaskHandler() {});

  if (name) {
    self.queue[name] = task;
  }

  return self;
}
Ether.prototype.task = etherTaskRegisterHandler;

function etherRunRegisterHandler(name, args, ctx) {
  var self = this;
  var out = null;

  name = (name || null);
  args = (args || []);
  ctx = (ctx || self);

  if (name && (self.queue[name] !== undefined)) {
    out = self.queue[name].apply(ctx, args);
  }

  return out;
}
Ether.prototype.run = etherRunRegisterHandler;

function etherMakeHandler(name, fn) {
  var self = this;
  var callback = function callbackCompleteHandler() {};
  var hasRegisterFunction = ( fn !== undefined );

  name = (name || '');

  if (name && hasRegisterFunction) {
    self.circuit[name] = fn.bind(self);
  } else if (name && !hasRegisterFunction) {
    self.circuit[name].apply(self, [callback]);
  }

  return self;
}
Ether.prototype.make = etherMakeHandler;

module.exports = exports = new Ether();
