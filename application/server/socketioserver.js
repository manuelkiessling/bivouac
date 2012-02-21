var util = require('util');
var EventEmitter = require('events').EventEmitter;

var IncomingHandler = function() {}
util.inherits(IncomingHandler, EventEmitter);

IncomingHandler.prototype.receive = function(data) {
  this.emit('newMessage', data.toString());
}

var Server = function() {}
util.inherits(Server, EventEmitter);

Server.prototype.start = function() {
  var that = this;
  var httpd = require('http').createServer(handler);
  var io    = require('socket.io').listen(httpd);
  var fs    = require('fs');

  httpd.listen(8080);
  io.set('log level', 1);

  function handler(req, res) {
    fs.readFile(__dirname + '/../view/index.html', function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  }

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
