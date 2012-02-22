var util = require('util');
var EventEmitter = require('events').EventEmitter;

var IncomingHandler = function() {}
util.inherits(IncomingHandler, EventEmitter);

IncomingHandler.prototype.receive = function(data) {
  this.emit('newMessage', data.toString());
}

var Server = function() {}
util.inherits(Server, EventEmitter);

Server.prototype.start = function(webserver) {
  var that = this;
  var io    = require('socket.io').listen(webserver);

  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    var incomingHandler = new IncomingHandler();
    // Browser sends new message
    socket.on('say', function(data) {
      incomingHandler.receive(data);
    });

    // This function is emitted in order to allow clients of this object to send data to this user's browser
    var outgoingHandler = function (data) {
      socket.emit('hear', data);
    }
    that.emit('newConnection', incomingHandler, outgoingHandler);
  });
}

module.exports = new Server();
