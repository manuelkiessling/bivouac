"use strict";
var Room = require('../../../src/server/domain/room.js').Room;

describe('addUser', function() {

  it('adds a user to the room', function() {
    var room = new Room('default');
    var user = { name: 'foo' };
    room.addUser(user);
    expect(room.getUsers()[0]).toEqual(user);
  });

  it('creates a new system message', function() {
    var room = new Room('default');
    room.addUser({ name: 'foo' });
    var communications = room.getCommunications();
    expect(communications[0].message).toEqual('User foo entered the chat.');
  });

});
