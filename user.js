var User = function(name) {
  this.name = name;
}

User.prototype.say = function(message) {
  var communication = new Communication(this, message);
  this.room.transport(communication);
}

User.prototype.hear = function(communication) {
  if (communication.user !== this) {
    this.writeToClient(communication.user.name + ": " + communication.message);
  }
}

User.prototype.registerWriteToClient = function(writeToClient) {
  this.writeToClient = writeToClient;
}

exports.User = User;
