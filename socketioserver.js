var start = function(handleNewConnection) {
  var server = require('http').createServer(handler);
  var io     = require('socket.io').listen(server);
  var fs     = require('fs');

  server.listen(80);

  function handler(req, res) {
    fs.readFile(__dirname + '/htdocs/index.html', function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  }

  io.sockets.on('connection', function(socket) {
    console.log('New connection');
    var handlers = handleNewConnection();

    socket.on('say', function(data) {
      console.log('Incoming data');
      handlers.handleIncomingData(data);
    });

    function outgoingHandler(text) {
      socket.emit('hear', text);
    }
    handlers.registerOutgoingDataHandler(outgoingHandler);
  });

}

exports.start = start;
