bivouac.chat = {

  start: function(username) {
    var socket = io.connect('http://localhost');
    socket.emit('enter', username);
    return socket;
  },

  handleInput: function(socket, inputElement) {
    inputElement.focus();
    inputElement.keypress(function(e) {
      if (e.which == 13) {
        socket.emit('say', inputElement.val());
        inputElement.val('');
        e.preventDefault();
        return false;
      }
    });
  },

  handleOutput: function (socket, messagesElement) {
    socket.on('hear', function (communication) {
      if (communication.type === 'user') {
        messagesElement.append('<div class="message"><span class="says"><span class="username">' + $('<div/>').text(communication.username).html() + '</span> says:</span> ' + $('<div/>').text(communication.message).html() + '</div>')
      }
      if (communication.type === 'system') {
        messagesElement.append('<div class="message"><i>' + $('<div/>').text(communication.message).html() + '</i></div>')
      }
      messagesElement.scrollTop(99999);
    });
  }

}
