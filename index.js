(function () {
  var renderer = require("./application/renderer/objectRenderer.js");
  var connectionController = require("./application/controller/connectionController.js");
  var server = require("./application/server/socketioserver.js");

  connectionController.setRenderer(renderer);
  server.start(connectionController.handleNewConnection);
})();
