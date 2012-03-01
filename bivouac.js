"use strict";
(function () {
  var domain               = require('./src/server/domain/domain.js');
  var filesharing          = require('./src/server/app/filesharing/filesharing.js');
  var httpd                = require('./src/server/app/httpd/httpd.js');
  var chatd                = require('./src/server/app/chatd/daemon/chatd.js');
  var roomController       = require('./src/server/app/chatd/controller/room.js');
  var objectRenderer       = require('./src/server/app/chatd/renderer/object.js');
  var connectionController = require('./src/server/app/chatd/controller/connection.js');

  roomController.init(
    domain.Room,
    chatd.start(httpd.start(
      process.cwd() + '/src/client',
      roomController,
      filesharing
      )
    ),
    connectionController,
    objectRenderer
  );
})();
