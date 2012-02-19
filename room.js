var Room = function(name) {
  this.name = name;
  this.users = [];
}

Room.prototype.addUser = function(user) {
  console.log("Entered room: " + user.name);
  this.users.push(user);
}

Room.prototype.getUsers = function() {
  return this.users;
}

Room.prototype.transport = function(communication) {
  var n = this.users.length;
  for (i = 0; i < n; i++) {
    console.log("Transporting message '" + communication.message + "' to " + this.users[i].name);
    this.users[i].hear(communication);
  }
}

exports.Room = Room;
