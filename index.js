Room = require("./room.js")["Room"];
User = require("./user.js")["User"];
Communication = require("./communication.js")["Communication"];

var room = new Room("default");
var userId = 0;

function handleNewConnection(outgoingHandler) {
  userId = userId + 1;

  var user = new User("guest" + userId);
  room.addUser(user);

  function writeToClient(text) {
    outgoingHandler(text);
  }
  user.registerWriteToClient(writeToClient);

  function handleIncomingData(text) {
    var communication = new Communication(user, text);
    room.transport(communication);
  }
  return handleIncomingData;
}

require("./socketioserver.js").start(handleNewConnection);
