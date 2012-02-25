"use strict";
var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');

var start = function(documentRoot, handleUpload, uploadCallback, handleDownload) {
  var server = http.createServer(function(request, response) {
    var uriPath = url.parse(request.url).pathname;
    var filename;

    if (uriPath == '/upload' && request.method.toLowerCase() == 'post') {
      console.log('Handling upload...');
      handleUpload(request, response, uploadCallback);
      return;
    }

    if (uriPath.match(/\/download/) && request.method.toLowerCase() == 'get') {
      var parts = uriPath.match(/\/download\/(.*)/);
      filename = parts[1];
      console.log('Handling download of "' + filename + '"...');
      handleDownload(filename, response);
      return;
    }

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

        response.writeHead(200);
        response.write(file, 'binary');
        response.end();
      });
    });
  }).listen(8080);
  return server;
}

exports.start = start;
