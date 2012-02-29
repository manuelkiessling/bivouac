"use strict";
(function () {
  var domain = require('./lib/server/domain/domain.js');
  var filesharing = require('./lib/server/app/filesharing/filesharing.js');
  var httpd = require('./lib/server/app/httpd/httpd.js');
  var chatd = require('./lib/server/app/chatd/daemon/chatd.js');
  var roomController = require('./lib/server/app/chatd/controller/room.js');
  var connectionController = require('./lib/server/app/chatd/controller/connection.js');

  roomController.init(
    domain.Room,
    chatd.start(httpd.start(
      process.cwd() + '/lib/client',
      roomController,
      filesharing
      )
    ),
    connectionController
  );
})();
