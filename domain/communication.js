var UserCommunication = function(user, message) {
  this.user = user;
  this.message = message;
}

var SystemCommunication = function(message) {
  this.message = message;
}

exports.UserCommunication = UserCommunication;
exports.SystemCommunication = SystemCommunication;
