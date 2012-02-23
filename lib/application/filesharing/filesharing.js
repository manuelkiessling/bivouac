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
      response.writeHead(200, {'content-type': 'text/plain'});
      response.end(JSON.stringify('ok'));
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
