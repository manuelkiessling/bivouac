"use strict";
var uuid = require('node-uuid');

var Room;
var chatd;
var connectionsController;
var renderer;
var rooms = {};
var connectionsControllers = {};
var initialized = false;

var init = function(theRoom, theChatd, theConnectionsController, theRenderer) {
  Room = theRoom;
  chatd = theChatd;
  connectionsController = theConnectionsController;
  renderer = theRenderer;
  initialized = true;
}

var generateRoomname = function() {
  var buffer = new Buffer(32);
  while (true) {
    uuid.v4(null, buffer, 0);
    var name = uuid.unparse(buffer);
    if (!rooms[name]) {
      return name;
    }
  }
}

var addRoom = function(name) {
  if (!name.match(/^[a-z0-9\-]*$/) || name === '') {
    return false;
  }
  if (!initialized || rooms[name]) {
    return false;
  }
  var room = new Room(name);
  rooms[name] = room;
  var newconnectionsController = connectionsController.create();
  newconnectionsController.attachRenderer(renderer);
  newconnectionsController.attachRoomAndChatd(room, chatd.getNamespacedChatd(room.name));
  connectionsControllers[name] = newconnectionsController;
  console.log('Created room ' + name);
  return true;
}

var handleUpload = function(roomname, filename, filetype) {
  connectionsControllers[roomname].sendDownloadCommunication(filename, filetype);
}

exports.init = init;
exports.addRoom = addRoom;
exports.generateRoomname = generateRoomname;
exports.handleUpload = handleUpload;
