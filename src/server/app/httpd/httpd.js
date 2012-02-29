"use strict";
var http        = require('http');
var url         = require('url');
var querystring = require('querystring');
var mime        = require('mime');
var path        = require('path');
var fs          = require('fs');
var util        = require('util');

var start = function(documentRoot, roomController, filesharing) {
  var server = http.createServer(function(request, response) {
    var uriPath = url.parse(request.url).pathname;
    var filename;
    var roomname;

    // Chat creation

    if (uriPath == '/createRoom' && request.method.toLowerCase() == 'post') {
      request.on('end', function() {
        roomname = roomController.generateRoomname();
        var success = roomController.addRoom(roomname);
        if (success) {
          response.writeHead(302, {'Location': '/chat.html?roomname=' + roomname});
          response.end();
        }
      });
    }


    // Filesharing

    if (uriPath == '/upload' && request.method.toLowerCase() == 'post') {
      roomname = querystring.parse(url.parse(request.url).query)['roomname'];
      console.log('Handling upload for room ' + roomname + '...');
      filesharing.upload(roomname, request, function(error, filename, filetype) {
        if (error) {
          response.writeHead(500, {'Content-Type': 'application/json'});
          response.end(JSON.stringify(error));
        } else {
          console.log('Notifying chat about file "' + filename + '"');
          roomController.handleUpload(roomname, filename, filetype);
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end(JSON.stringify('ok'));
        }
      });
      return;
    }

    if (uriPath.match(/\/download/) && request.method.toLowerCase() == 'get') {
      roomname = querystring.parse(url.parse(request.url).query)['roomname'];
      filename = uriPath.match(/\/download\/(.*)/)[1];
      console.log('Handling download of "' + filename + '" for room ' + roomname + '...');

      var startCallback = function(filetype, filesize) {
        response.writeHead(200, {
          'Content-Type': filetype,
          'Transfer-Encoding': 'chunked',
          'Content-Length': filesize.toString()
        });
      }

      var errorCallback = function(error) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end(error);
      }

      filesharing.download(roomname, filename, response, startCallback, errorCallback);
      return;
    }


    // Static fileserving

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
