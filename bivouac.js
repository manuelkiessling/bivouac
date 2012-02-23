(function () {
  var filesharing = require('./lib/application/filesharing/filesharing.js');
  var webserver = require('./lib/application/webserver/webserver.js');
  var chatserver = require('./lib/application/chatserver/server/socketioserver.js');
  var renderer = require('./lib/application/chatserver/renderer/objectRenderer.js');
  var connectionController = require('./lib/application/chatserver/controller/connectionController.js');

  connectionController.attachRenderer(renderer);
  connectionController.attachServer(chatserver);
  chatserver.start(webserver.start(process.cwd() + '/lib/application/client', filesharing.handleUpload, connectionController.handleUpload, filesharing.handleDownload));
})();
