var objectRenderer = require('../renderer/object.js');
var chatdSocket;
var connectionController;
var rooms = {};
var initialized = false;

var init = function(theChatdSocket, theConnectionController) {
  chatdSocket = theChatdSocket;
  connectionController = theConnectionController;
  initialized = true;
}

var addRoom = function(name, Room) {
  if (!initialized || rooms[name]) {
    return false;
  }
  var room = new Room(name);
  rooms[name] = room;
  var newConnectionController = connectionController.create();
  newConnectionController.attachRenderer(objectRenderer);
  newConnectionController.attachRoomAndChatd(room, chatdSocket.of('/'.name));
  return true;
}

exports.init = init;
exports.addRoom = addRoom;
