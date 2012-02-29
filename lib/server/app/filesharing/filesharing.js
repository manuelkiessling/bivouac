"use strict";
var util = require('util');
var fs = require('fs');
var mime = require('mime');
var formidable = require('formidable');

var filepath = function(roomname, filename) {
  return '/tmp/bivouac_upload_' + roomname + '_' + filename;
}

var upload = function(roomname, request, callback) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    var filename = files.file.name.replace(/ /g, '_');
    fs.rename(files.file.path, filepath(roomname, filename), function(error) {
      if (error) {
        callback(error, null, null);
      } else {
        callback(false, filename, files.file.type);
      }
    });
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    console.log('Upload for room ' + roomname + ' progress: ' +
      bytesReceived.toString() +
      ' of ' +
      bytesExpected.toString() +
      ' bytes done (' + Math.round((100 / bytesExpected) * bytesReceived) + '%)');
  });
}

var download = function(roomname, filename, response, startCallback, errorCallback) {
  var path = filepath(roomname, filename);

  fs.stat(path, function(error, stats) {
    startCallback(mime.lookup(path), stats.size);

    fs.createReadStream(path, {
      'flags': 'r',
      'bufferSize': 4 * 1024
    }).addListener('error', function(error) {
        errorCallback(error);
      }).pipe(response);
    });
}

exports.upload = upload;
exports.download = download;
