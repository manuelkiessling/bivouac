"use strict";
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var IncomingHandler = function() {}
util.inherits(IncomingHandler, EventEmitter);

IncomingHandler.prototype.receive = function(type, data) {
  this.emit(type, data.toString());
}

var io;
var Chatd = function() {}

Chatd.prototype.start = function(webChatd) {
  io = require('socket.io').listen(webChatd);
  io.set('log level', 1);
  return this;
}

Chatd.prototype.getNamespacedChatd = function(namespace) {
  var namespacedChatd = new NamespacedChatd();
  namespacedChatd.start(namespace);
  return namespacedChatd;
}

var NamespacedChatd = function() {}
util.inherits(NamespacedChatd, EventEmitter);

NamespacedChatd.prototype.start = function(namespace) {
  var that = this;
  io.of('/' + namespace).on('connection', function(socket) {
    var incomingHandler = new IncomingHandler();

    // User logs into chat
    socket.on('enter', function(data) {
      incomingHandler.receive('newUser', data);
    });

    // User sends new message
    socket.on('say', function(data) {
      incomingHandler.receive('newMessage', data);
    });

    // This function is emitted in order to allow clients of this object to send data to this user's browser
    var outgoingHandler = function(data) {
      socket.emit('hear', data);
    }
    that.emit('newConnection', incomingHandler, outgoingHandler);
  });
}

module.exports = new Chatd();
