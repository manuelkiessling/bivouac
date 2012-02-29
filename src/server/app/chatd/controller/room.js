var uuid = require('node-uuid');
var objectRenderer = require('../renderer/object.js');
var Room;
var chatd;
var connectionController;
var rooms = {};
var connectionControllers = {};
var initialized = false;

var init = function(theRoom, theChatd, theConnectionController) {
  Room = theRoom;
  chatd = theChatd;
  connectionController = theConnectionController;
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
  var newConnectionController = connectionController.create();
  newConnectionController.attachRenderer(objectRenderer);
  newConnectionController.attachRoomAndChatd(room, chatd.getNamespacedChatd(room.name));
  connectionControllers[name] = newConnectionController;
  console.log('Created room ' + name);
  return true;
}

var handleUpload = function(roomname, filename, filetype) {
  connectionControllers[roomname].sendDownloadCommunication(filename, filetype);
}

exports.init = init;
exports.addRoom = addRoom;
exports.generateRoomname = generateRoomname;
exports.handleUpload = handleUpload;
