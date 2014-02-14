'use strict';
function etherMainHandler(context, queue) {
  var self = this;

  self.context = (context || {});
  self.queue = (queue || {});

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

  key = (key || null);
  value = (value || null);

  if (key) {
    self.context[key] = value;
  }

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

  if (name) {
    out = self.queue[name].apply(ctx, args);
  }

  return out;
}
Ether.prototype.run = etherRunRegisterHandler;

module.exports = exports = new Ether();
