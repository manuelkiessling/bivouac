"use strict";
var http        = require('http');
var url         = require('url');
var querystring = require('querystring');
var mime        = require('mime');
var path        = require('path');
var fs          = require('fs');
var util        = require('util');

var start = function(documentRoot, roomController) {
  var server = http.createServer(function(request, response) {
    var uriPath = url.parse(request.url).pathname;
    var filename;

    // Chat creation

    if (uriPath == '/createRoom' && request.method.toLowerCase() == 'post') {
      var body = '';

      request.on('data', function(chunk) {
        // append the current chunk of data to the fullBody variable
        body += chunk.toString();
      });

      request.on('end', function() {
        var decodedBody = querystring.parse(body);
        var roomname = decodedBody.name;
        var success = roomController.addRoom(roomname);
        if (success) {
          response.writeHead(302, {
            'Location': '/chat.html?roomname=' + roomname
          });
          response.end();
        }
      });
    }


    // Filesharing

    if (uriPath == '/upload' && request.method.toLowerCase() == 'post') {
      console.log('Handling upload...');
      roomController.handleUpload(roomname, request, function(status) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(JSON.stringify(status));
      });
      return;
    }

    if (uriPath.match(/\/download/) && request.method.toLowerCase() == 'get') {
      var parts = uriPath.match(/\/download\/(.*)/);
      filename = parts[1];
      console.log('Handling download of "' + filename + '"...');
      roomController.handleDownload(filename, response);
      return;
    }


    // static file serving

    filename = path.join(documentRoot, uriPath);
    console.log(uriPath + ' -> ' + filename);

    path.exists(filename, function(exists) {
      if (!exists) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, 'binary', function(err, file) {
        if (err) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.write(err + '\n');
          response.end();
          return;
        }

        response.writeHead(200, {'Content-Type': mime.lookup(filename)});
        response.write(file, 'binary');
        response.end();
      });
    });
  }).listen(8080);
  return server;
}

exports.start = start;
