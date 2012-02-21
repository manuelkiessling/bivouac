Room = require("../../domain/room.js")["Room"];
User = require("../../domain/user.js")["User"];
Communication = require("../../domain/communication.js")["Communication"];

var room = new Room("default");
var userId = 0;
var outgoingHandlers = {};
var renderer = null;

var setRenderer = function(theRenderer) {
  renderer = theRenderer;
}

var handleNewConnection = function(outgoingHandler) {
  userId = userId + 1;

  var user = new User(userId, "guest" + userId);
  room.addUser(user);

  outgoingHandlers[user] = outgoingHandler;

  function handleIncomingData(text) {
    var communication = new Communication(user, text);
    room.addCommunication(communication);
    deliver();
  }
  return handleIncomingData;
}

var deliver = function() {
  var communications = room.getCommunications();
  var numberOfCommunications = communications.length;

  if (numberOfCommunications > 0) {
    var users = room.getUsers();
    var numberOfUsers = users.length;

    for (i = 0; i < numberOfCommunications; i++) {
      for (j = 0; j < numberOfUsers; j++) {
        if (users[j] != communications[i].user) {
          outgoingHandlers[users[j]](renderer.render(communications[i].user.name, communications[i].message));
        }
      }
      room.markCommunicationAsDelivered(communications[i]);
    }
  }
};

exports.setRenderer = setRenderer;
exports.handleNewConnection = handleNewConnection;
