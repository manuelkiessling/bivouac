"use strict";
var util = require('util');
var fs = require('fs');
var mime = require('mime');
var formidable = require('formidable');

var handleUpload = function(request, response, inform) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    var filename = files.file.name.replace(/ /g, '_');
    fs.rename(files.file.path, '/tmp/bivouac_upload_' + filename, function(err) {
      inform(filename, files.file.type);

    });
  });
}

var handleDownload = function(filename, callback) {
  var path = '/tmp/bivouac_upload_' + filename;
  fs.readFile(path, 'binary', function(error, file) {
    if (error) {
      callback({ error: true, errorMessage: error });
    } else {
      callback({
        error: false,
        'content-type': mime.lookup(path),
        'file-content': file
      });
    }
  });
}

exports.handleUpload = handleUpload;
exports.handleDownload = handleDownload;
