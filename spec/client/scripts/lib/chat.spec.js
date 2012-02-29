"use strict";
var jsdom = require('jsdom').jsdom;
var window = jsdom().createWindow();
global.$ = global.jQuery = require('jQuery').create(window);

var requirejs = require('requirejs');

requirejs([__dirname + '/../../../../src/client/scripts/lib/chat.js'], function(chat) {

  describe('start', function() {

    it('emits the "enter" event on the socket', function() {
      var socket = {
        emit: function(name, data) {}
      }
      var io = {
        connect: function(host) {
          return socket;
        }
      }

      spyOn(socket, 'emit');
      chat.start(io, 'johndoe');
      expect(socket.emit).toHaveBeenCalled();
    });

  });

  describe('handleOutput', function() {

    it('listens to the "socket.on hear" event', function() {
      var mock = {
        callback: function(communication) {}
      }
      var socket = {
        on: function(name) {
          if (name === 'hear') {
            mock.callback();
          }
        }
      }
      spyOn(mock, 'callback');
      chat.handleOutput(socket, null);
      expect(mock.callback).toHaveBeenCalled();
    });

    it('appends the correct html and scrolls the messages area if a user communication is received', function() {
      var communication = {
        type: 'user',
        username: 'johndoe',
        message: 'hello world'
      }
      var socket = {
        on: function(name, callback) {
          if (name === 'hear') callback(communication);
        }
      }
      var messagesElement = {
        append: function(content) {},
        scrollTop: function(pixels) {}
      }
      spyOn(messagesElement, 'append');
      spyOn(messagesElement, 'scrollTop');
      chat.handleOutput(socket, messagesElement);
      expect(messagesElement.append).toHaveBeenCalledWith('<div class="message user"><span class="says"><span class="username">johndoe</span> says:</span> hello world</div>');
      expect(messagesElement.scrollTop).toHaveBeenCalledWith(999999);
    });

  });

});
