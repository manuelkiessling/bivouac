(function () {
  var filesharing = require("./application/filesharing/filesharing.js");
  var webserver = require("./application/webserver/webserver.js");
  var chatserver = require("./application/chatserver/server/socketioserver.js");
  var renderer = require("./application/chatserver/renderer/objectRenderer.js");
  var connectionController = require("./application/chatserver/controller/connectionController.js");

  connectionController.attachRenderer(renderer);
  connectionController.attachServer(chatserver);
  chatserver.start(webserver.start(process.cwd() + "/application/client", filesharing.handleUpload, connectionController.handleUpload, filesharing.handleDownload));
})();
