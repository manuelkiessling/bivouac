"use strict";
var render = function(communication) {
  var renderedCommunication = {};
  if (communication.type === 'user') {
    renderedCommunication = { type: communication.type, username: communication.user.name, message: communication.message };
  } else {
    for (var field in communication) {
      if (communication.hasOwnProperty(field)) {
        renderedCommunication[field] = communication[field];
      }
      renderedCommunication.type = communication.type;
    }
  }

  return renderedCommunication;
}

exports.render = render;
