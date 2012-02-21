(function () {
  var renderer = require("./application/renderer/objectRenderer.js");
  var connectionController = require("./application/controller/connectionController.js");
  var server = require("./application/server/socketioserver.js");

  connectionController.attachRenderer(renderer);
  connectionController.attachServer(server);

  server.start();
})();
