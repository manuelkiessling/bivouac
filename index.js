Room = require("./room.js")["Room"];
User = require("./user.js")["User"];
Communication = require("./communication.js")["Communication"];

var room = new Room("default");
var userId = 0;

function handleNewConnection() {
  userId = userId + 1;

  var user = new User("guest" + userId);
  var outgoingHandler = undefined;

  room.addUser(user);

  function handleIncomingData(text) {
    var communication = new Communication(user, text);
    room.transport(communication);
  }

  function registerOutgoingDataHandler(theOutgoingHandler) {
    outgoingHandler = theOutgoingHandler;
  }

  function writeToClient(text) {
    outgoingHandler(text);
  }

  user.registerWriteToClient(writeToClient);

  return { handleIncomingData: handleIncomingData,
           registerOutgoingDataHandler: registerOutgoingDataHandler };

}

require("./socketioserver.js").start(handleNewConnection);
