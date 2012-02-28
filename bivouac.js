"use strict";
(function () {
  var filesharing = require('./lib/server/app/filesharing/filesharing.js');
  var httpd = require('./lib/server/app/httpd/httpd.js');
  var chatd = require('./lib/server/app/chatd/server/socketio.js');
  var roomController = require('./lib/server/app/chatd/controller/room.js');
  var connectionController = require('./lib/server/app/chatd/controller/room.js');

  roomController.init(
    chatd.start(httpd.start(
      process.cwd() + '/lib/client',
      roomController.addRoom
      )
    ),
    connectionController.create
  );
})();
