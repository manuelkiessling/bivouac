"use strict";
var domain = require('../../../domain/domain.js');

var deliver = function() {
  var communications = this.room.getCommunications();
  var numberOfCommunications = communications.length;

  if (numberOfCommunications > 0) {
    var users = this.room.getUsers();
    var numberOfUsers = users.length;

    for (var i = 0; i < numberOfCommunications; i++) {
      for (var j = 0; j < numberOfUsers; j++) {
        this.outgoingHandlers[users[j]](this.renderer.render(communications[i]));
      }
      this.room.markCommunicationAsDelivered(communications[i]);
    }
  }
};

var ConnectionsController = function() {
  this.userId = 0;
  this.outgoingHandlers = {};
  this.renderer;
  this.namespacedChatd;
  this.room;
}

ConnectionsController.prototype.attachRenderer = function(theRenderer) {
 this.renderer = theRenderer;
}

ConnectionsController.prototype.attachRoomAndChatd = function(theRoom, theNamespacedChatd) {
  var that = this;
  this.room = theRoom;
  this.namespacedChatd = theNamespacedChatd;

  this.namespacedChatd.on('newConnection', function(incomingHandler, outgoingHandler) {
    var user;
    incomingHandler.on('newUser', function(name) {
      that.userId = that.userId + 1;

      user = new domain.User(that.userId, name);
      that.room.addUser(user);

      that.outgoingHandlers[user] = outgoingHandler;

      deliver.call(that);
    });

    incomingHandler.on('newMessage', function(message) {
      var communication = new domain.UserCommunication(user, message);
      that.room.addCommunication(communication);

      deliver.call(that);
    });
  });
}

ConnectionsController.prototype.sendDownloadCommunication = function(filename, type) {
  var communication = new domain.DownloadCommunication(
    filename,
    type,
    '/download/' + encodeURIComponent(filename) + '?roomname=' + this.room.name
  );
  this.room.addCommunication(communication);
  deliver.call(this);
};

module.exports = ConnectionsController;
