var util = require('util');
var fs = require('fs');
var mime = require('mime');
var formidable = require('formidable');

var handleUpload = function(request, response, inform) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fs.rename(files.file.path, '/tmp/bivouac_upload_' + files.file.name, function(err) {
      inform(files.file.name, files.file.type);
      response.writeHead(200, {'content-type': 'text/plain'});
      response.end('ok');
    });
  });
}

var handleDownload = function(filename, response) {
  var path = '/tmp/bivouac_upload_' + filename;
  fs.readFile(path, 'binary', function(error, file) {
    if(error) {
      response.writeHead(500, {'content-type': 'text/plain'});
      response.end(error + '\n');
    } else {
      response.writeHead(200, {
        'content-type': mime.lookup(path)
      });
      response.end(file, 'binary');
    }
  });
}

exports.handleUpload = handleUpload;
exports.handleDownload = handleDownload;
