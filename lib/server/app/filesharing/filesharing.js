"use strict";
var util = require('util');
var fs = require('fs');
var mime = require('mime');
var formidable = require('formidable');

var filepath = function(roomname, filename) {
  return '/tmp/bivouac_upload_' + roomname + '_' + filename;
}

var upload = function(roomname, request, callback) {
  var files = [];
  var form;

  var rename = function(source, target, fn, ft) {
    fs.rename(source, target, function(error) {
      console.log('Callback for file "' + fn + '"');
      if (error) {
        callback(error, null, null);
      } else {
        callback(false, fn, ft);
      }
    });
  }

  form = new formidable.IncomingForm();

  form.on('file', function(field, file) {
    console.log('Received file "' + file.name + '"');
    files.push(file);
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
    console.log('Upload for room ' + roomname + ' progress: ' +
      bytesReceived.toString() +
      ' of ' +
      bytesExpected.toString() +
      ' bytes done (' + Math.round((100 / bytesExpected) * bytesReceived) + '%)');
  });

  form.on('end', function() {
    for (var i = 0; i < files.length; i++) {
      var currentfile = files[i];
      var normalizedfilename = currentfile.name.replace(/ /g, '_');
      console.log('Treating file "' + normalizedfilename + '"');
      rename(currentfile.path, filepath(roomname, normalizedfilename), normalizedfilename, currentfile.type);
    }
  });

  form.parse(request);
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
