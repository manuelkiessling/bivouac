Room = require("../../../domain/room.js")["Room"];
User = require("../../../domain/user.js")["User"];
UserCommunication = require("../../../domain/communication.js")["UserCommunication"];
SystemCommunication = require("../../../domain/communication.js")["SystemCommunication"];

var room = new Room("default");
var userId = 0;
var outgoingHandlers = {};
var renderer = null;
var server = null;

var attachRenderer = function(theRenderer) {
  renderer = theRenderer;
}

var attachServer = function(theServer) {
  server = theServer;
  var user;

  server.on('newConnection', function(incomingHandler, outgoingHandler) {
    incomingHandler.on('newUser', function(name) {
      userId = userId + 1;

      user = new User(userId, name);
      room.addUser(user);

      outgoingHandlers[user] = outgoingHandler;

      deliver();
    });

    incomingHandler.on('newMessage', function(message) {
      var communication = new UserCommunication(user, message);
      room.addCommunication(communication);

      deliver();
    });
  });
}

var deliver = function() {
  var communications = room.getCommunications();
  var numberOfCommunications = communications.length;

  if (numberOfCommunications > 0) {
    var users = room.getUsers();
    var numberOfUsers = users.length;

    for (var i = 0; i < numberOfCommunications; i++) {
      for (var j = 0; j < numberOfUsers; j++) {
        outgoingHandlers[users[j]](renderer.render(communications[i]));
      }
      room.markCommunicationAsDelivered(communications[i]);
    }
  }
};

exports.attachRenderer = attachRenderer;
exports.attachServer = attachServer;
