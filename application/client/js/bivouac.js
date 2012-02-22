var bivouac = {

  start: function() {
    var socket = io.connect('http://localhost');
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
    socket.on('hear', function (data) {
      messagesElement.prepend('<div class="message"><span class="says"></span><span class="username">' + $('<div/>').text(data.name).html() + '</span> says:</span> ' + $('<div/>').text(data.message).html() + '</div>')
    });
  }

}
