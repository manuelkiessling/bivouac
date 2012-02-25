"use strict";
var domain = require('../../../domain/domain.js');

var room = new domain.Room('default', domain.SystemCommunication);
var userId = 0;
var outgoingHandlers = {};
var renderer = null;
var server = null;

var attachRenderer = function(theRenderer) {
  renderer = theRenderer;
}

var attachServer = function(theServer) {
  server = theServer;
  var user;

  server.on('newConnection', function(incomingHandler, outgoingHandler) {
    incomingHandler.on('newUser', function(name) {
      userId = userId + 1;

      user = new domain.User(userId, name);
      room.addUser(user);

      outgoingHandlers[user] = outgoingHandler;

      deliver();
    });

    incomingHandler.on('newMessage', function(message) {
      var communication = new domain.UserCommunication(user, message);
      room.addCommunication(communication);

      deliver();
    });
  });
}

var deliver = function() {
  var communications = room.getCommunications();
  var numberOfCommunications = communications.length;

  if (numberOfCommunications > 0) {
    var users = room.getUsers();
    var numberOfUsers = users.length;

    for (var i = 0; i < numberOfCommunications; i++) {
      for (var j = 0; j < numberOfUsers; j++) {
        outgoingHandlers[users[j]](renderer.render(communications[i]));
      }
      room.markCommunicationAsDelivered(communications[i]);
    }
  }
};

var handleUpload = function(filename, type) {
  var communication = new domain.DownloadCommunication(filename, type, '/download/' + encodeURIComponent(filename));
  room.addCommunication(communication);
  deliver();
};

exports.attachRenderer = attachRenderer;
exports.attachServer = attachServer;
exports.handleUpload = handleUpload;
