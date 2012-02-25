"use strict";
(function () {
  var filesharing = require('./lib/server/app/filesharing/filesharing.js');
  var httpd = require('./lib/server/app/httpd/httpd.js');
  var chatd = require('./lib/server/app/chatd/server/socketio.js');
  var objectRenderer = require('./lib/server/app/chatd/renderer/object.js');
  var connectionController = require('./lib/server/app/chatd/controller/connection.js');

  connectionController.attachRenderer(objectRenderer);
  connectionController.attachServer(chatd);
  chatd.start(httpd.start(process.cwd() + '/lib/client', filesharing.handleUpload, connectionController.handleUpload, filesharing.handleDownload));
})();
