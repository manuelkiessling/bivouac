(function () {
  var renderer = require("./application/renderer/terminalRenderer.js");
  var connectionController = require("./application/controller/connectionController.js");
  var server = require("./application/server/tcpserver.js");

  connectionController.setRenderer(renderer);
  server.start(connectionController.handleNewConnection);
})();
