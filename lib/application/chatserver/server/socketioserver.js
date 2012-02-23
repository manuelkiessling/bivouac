var util = require('util');
var EventEmitter = require('events').EventEmitter;

var IncomingHandler = function() {}
util.inherits(IncomingHandler, EventEmitter);

IncomingHandler.prototype.receive = function(type, data) {
  this.emit(type, data.toString());
}

var Server = function() {}
util.inherits(Server, EventEmitter);

Server.prototype.start = function(webserver) {
  var that = this;
  var io    = require('socket.io').listen(webserver);

  io.set('log level', 1);
  io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });

  io.sockets.on('connection', function(socket) {
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

module.exports = new Server();
