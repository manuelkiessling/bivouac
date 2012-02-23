var UserCommunication = function(user, message) {
  this.user = user;
  this.message = message;
}

var SystemCommunication = function(message) {
  this.message = message;
}

var DownloadCommunication = function(filename, filetype, url) {
  this.filename = filename;
  this.filetype = filetype;
  this.url = url;
}

exports.UserCommunication = UserCommunication;
exports.SystemCommunication = SystemCommunication;
exports.DownloadCommunication = DownloadCommunication;
