var util = require('util');
var objectRenderer = require('../renderer/object.js');
var Room;
var chatd;
var connectionController;
var rooms = {};
var connectionControllers = [];
var initialized = false;

var init = function(theRoom, theChatd, theConnectionController) {
  Room = theRoom;
  chatd = theChatd;
  connectionController = theConnectionController;
  initialized = true;
}

var addRoom = function(name) {
  if (!initialized || rooms[name]) {
    return false;
  }
  var room = new Room(name);
  rooms[name] = room;
  var newConnectionController = connectionController.create();
  newConnectionController.attachRenderer(objectRenderer);
  newConnectionController.attachRoomAndChatd(room, chatd.getNamespacedChatd(room.name));
  connectionControllers.push(newConnectionController);
  console.log('Created room ' + name);
  return true;
}

exports.init = init;
exports.addRoom = addRoom;
