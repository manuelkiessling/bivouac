var UserCommunication = function(user, message) {
  this.user = user;
  this.message = message;
}
UserCommunication.prototype.type = 'user';

var SystemCommunication = function(message) {
  this.message = message;
}
SystemCommunication.prototype.type = 'system';

var DownloadCommunication = function(filename, filetype, url) {
  this.filename = filename;
  this.filetype = filetype;
  this.url = url;
}
DownloadCommunication.prototype.type = 'download';

exports.UserCommunication = UserCommunication;
exports.SystemCommunication = SystemCommunication;
exports.DownloadCommunication = DownloadCommunication;
