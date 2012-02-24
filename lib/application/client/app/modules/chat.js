define(["socket.io/socket.io.js"], function() {

	var chat = {

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
			messagesElement.append('<div class="message user"><span class="says"><span class="username">' + $('<div/>').text(communication.username).html() + '</span> says:</span> ' + $('<div/>').text(communication.message).html() + '</div>');
		  }
		  if (communication.type === 'system') {
			messagesElement.append('<div class="message system">' + $('<div/>').text(communication.message).html() + '</div>');
		  }
		  if (communication.type === 'download') {
			if (communication.filetype.match(/image\//)) {
			  messagesElement.append('<div class="message file inline"><a target="_blank" href="' + $('<div/>').text(communication.url).html() + '"><img src="' + $('<div/>').text(communication.url).html() + '"/><br /><span class="subtitle">' + $('<div/>').text(communication.filename).html() + '</span></a></div>');
			} else {
			  messagesElement.append('<div class="message file download">Uploaded file: <a target="_blank" href="' + $('<div/>').text(communication.url).html() + '">' + $('<div/>').text(communication.filename).html() + '</a></div>');
			}
		  }
		  messagesElement.scrollTop(999999);
		  setTimeout(function() { messagesElement.scrollTop(999999); }, 500 );
		});
	  }

	}

	return chat;
	
});