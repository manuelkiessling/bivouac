var test = require('utest');
var assert = require('assert');
var Room = require('../../../lib/server/domain/room.js').Room;

var SystemCommunication = function(message) {
  this.message = message;
}
var room;
test('Room', {

  before: function() {
    room = new Room('test', SystemCommunication);
  },

  'addUser adds the user to the room': function() {
    var user = { name: 'foo' };
    room.addUser(user);
    var users = room.getUsers();
    assert.equal(users[0], user);
  },

  'addUser creates a new system message': function() {
    var user = { name: 'foo' };
    room.addUser(user);
    var communications = room.getCommunications();
    assert.equal(communications[0].message, 'User foo entered the chat.');
  }

});
