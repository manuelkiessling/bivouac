var start = function(handleNewConnection) {
  var server = require('http').createServer(handler);
  var io     = require('socket.io').listen(server);
  var fs     = require('fs');

  server.listen(8080);

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
    console.log('New connection');
    function outgoingHandler(data) {
      socket.emit('hear', data);
    }
    var handleIncomingData = handleNewConnection(outgoingHandler);

    socket.on('say', function(data) {
      console.log('Incoming data');
      handleIncomingData(data);
    });

  });

}

exports.start = start;
