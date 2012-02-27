"use strict";
var Room = require('../../../lib/server/domain/room.js').Room;

var mocks = {
  SystemCommunication: function(message) {
    this.message = message;
  }
};

describe('addUser', function() {

  it('adds a user to the room', function() {
    var room = new Room('default', mocks.SystemCommunication);
    var user = { name: 'foo' };
    room.addUser(user);
    expect(room.getUsers()[0]).toEqual(user);
  });

  it('creates a new system message', function() {
    spyOn(mocks, 'SystemCommunication').andCallThrough();
    var room = new Room('default', mocks.SystemCommunication);
    room.addUser({ name: 'foo' });
    expect(mocks.SystemCommunication).toHaveBeenCalledWith('User foo entered the chat.');
    var communications = room.getCommunications();
    expect(communications[0].message).toEqual('User foo entered the chat.');
  });

});
