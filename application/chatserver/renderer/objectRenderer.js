var render = function(communication) {
  if (communication instanceof UserCommunication) {
    var renderedCommunication = { type: 'user', username: communication.user.name, message: communication.message };
  }
  else if (communication instanceof SystemCommunication) {
    var renderedCommunication = { type: 'system', message: communication.message };
  }

  return renderedCommunication;
}

exports.render = render;
