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
}

var download = function(roomname, filename, callback) {
  var path = filepath(roomname, filename);
  fs.readFile(path, 'binary', function(error, file) {
    if (error) {
      callback(error.toString(), null, null);
    } else {
      callback(false, mime.lookup(path), file);
    }
  });
}

exports.upload = upload;
exports.download = download;
