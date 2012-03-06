"use strict";

/*

  Welcome to the bivouac source code. I would like to help you feel at home
  and give you an overview on how the single parts of the application play
  together.

  Obviously, bivouac has a server and a client part. The client is an
  HTML/jQuery/Socket.io webapp that lives under ./client

  This script is here to start the server, which mainly consists of an http
  daemon (for serving HTML, receiving uploads, serving downloads) with
  Socket.io attached for handling chat communication via WebSockets.

  While this could be done in one single JS script with dozens of inline
  callbacks, I tried to separate the code into logical parts.

  Below you can see that the main building blocks are required():

  domain:
    Provides access to the constructors of the main basic domain objects that
    are relevant for the chat: rooms, users, and communications (a
    communication is an exchange of information between users via a room).

  filesharing:
    bivouac allows to upload files into a chat session, where they can be
    downloaded by the other users in the same chat room. filesharing is the
    module where uploads and downloads are handled - the http server triggers
    its methods upon receiving upload or download requests.

  httpd:
    Not surprisingly, this is where the web server is actually implemented.
    It mainly handles three types of http requests:

    POST requests to /createRoom trigger the roomsController, which creates a
    new "Room" domain object and sets up its connection with the chat daemon

    Requests to /upload and /download are passed to the filesharing module,
    which takes care of the file operations, and uploads also trigger the
    roomsController which takes care of informing the chat users within this
    room about the new download that is available.

  chatd:
    This is mainly a facade for Socket.io. It's the place where the main
    socket is started, namespaced sockets can be requested (by the
    roomsController - every room is attached to a namespaced Socket.io socket),
    and socket events are passed to the right place (e.g., the roomsController
    takes care of creating a new connectionsController when a new room is
    created, and links the room, connectionsController, and namespaced socket
    together, making events on the namespaced socket ending up in the
    connectionsController).

  roomsController:
    As said, takes care of handling all existing rooms, mapping them to a
    connectionsController, which it previously mapped to a namespaced chat
    daemon. Think of the roomsController as the switching point of the whole
    server.

  connectionsController:
    For every room, the roomsController creates a new connectionsController which
    takes care of all the chat-user connections for this room

  objectRenderer:
    Defines how communications are transformed before they get sent to a chat
    websocket

 */

(function () {
  var domain                = require('./src/server/domain/domain.js');
  var filesharing           = require('./src/server/app/filesharing/filesharing.js');
  var httpd                 = require('./src/server/app/httpd/httpd.js');
  var chatd                 = require('./src/server/app/chatd/daemon/chatd.js');
  var roomsController       = require('./src/server/app/chatd/controller/rooms.js');
  var ConnectionsController = require('./src/server/app/chatd/controller/connections.js');
  var objectRenderer        = require('./src/server/app/chatd/renderer/object.js');

  roomsController.init(
    domain.Room,                        // the roomsController uses this constructor to create new rooms
    chatd.start(                        // the Socket.io daemon is started, and...
      httpd.start(                      // ...the http daemon is passed in, which chatd needs to attach itself to
        process.cwd() + '/src/client',  // the webserver needs to know the root folder from which static files should be served
        roomsController,                // the webserver needs the roomsController in order to trigger it when a /createRoom request arrives
        filesharing                     // the webserver needs the filesharing object in order to trigger it when upload or download requests arrive
      )
    ),
    ConnectionsController,              // the roomsController needs the connectionsController for each rooms it creates
    objectRenderer                      // the roomsController uses the passed in renderer and passes it on to the connectionsController, which uses it...
  );                                    // ...to render outgoing chat messages
})();
