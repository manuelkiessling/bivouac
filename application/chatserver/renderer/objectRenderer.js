var render = function(communication) {
  var renderedCommunication;
  if (communication instanceof UserCommunication) {
    renderedCommunication = { type: 'user', username: communication.user.name, message: communication.message };
  } else if (communication instanceof SystemCommunication) {
    renderedCommunication = { type: 'system', message: communication.message };
  } else if (communication instanceof DownloadCommunication) {
    renderedCommunication = { type: 'download', filename: communication.filename, filetype: communication.filetype, url: communication.url };
  }

  return renderedCommunication;
}

exports.render = render;
