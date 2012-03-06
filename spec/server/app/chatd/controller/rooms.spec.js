"use strict";
var roomsController = require('../../../../../src/server/app/chatd/controller/rooms.js');

var mocks = {
  Room: function(name) {
    this.name = name;
  },

  chatd: { getNamespacedChatd: function() { return 'namespaced socket' } },

  attachRoomAndChatd: function(room, chatd) {},

  ConnectionsController: function() {
    this.attachRenderer = function(renderer) {};
    this.attachRoomAndChatd = mocks.attachRoomAndChatd;
    this.handleUpload = function(filename, type) {};
  }
};

describe('addRoom', function() {

  it('does not add a room if it was not initialized', function() {
    var success = roomsController.addRoom('abcdefg');
    expect(success).toBeFalsy();
  });

  it('adds a room if it was initialized', function() {
    spyOn(mocks, 'Room').andCallThrough();
    roomsController.init(mocks.Room, mocks.chatd, mocks.ConnectionsController);
    var success = roomsController.addRoom('abcdefg');
    expect(mocks.Room).toHaveBeenCalledWith('abcdefg');
    expect(success).toBeTruthy();
  });

  it('does not allow a non a-z0-9- room name', function() {
    var success = roomsController.addRoom('abcdefgü');
    expect(success).toBeFalsy();
    var success = roomsController.addRoom('abcdefg,');
    expect(success).toBeFalsy();
    var success = roomsController.addRoom('•');
    expect(success).toBeFalsy();
    var success = roomsController.addRoom('');
    expect(success).toBeFalsy();
    var success = roomsController.addRoom(' ');
    expect(success).toBeFalsy();
  });

  it('adds several rooms', function() {
    var success = roomsController.addRoom('hi-jklmn');
    expect(success).toBeTruthy();
    var success = roomsController.addRoom('opqrstu');
    expect(success).toBeTruthy();
    var success = roomsController.addRoom('vwxyz');
    expect(success).toBeTruthy();
  });

  it('does not allow to create a room with an existing name', function() {
    roomsController.addRoom('abcdefg');
    var success = roomsController.addRoom('abcdefg');
    expect(success).toBeFalsy();
  });

  it('sets up the connection controller for the new room', function() {
    spyOn(mocks, 'ConnectionsController').andCallThrough();
    spyOn(mocks, 'attachRoomAndChatd');
    roomsController.init(mocks.Room, mocks.chatd, mocks.ConnectionsController);
    roomsController.addRoom('1234567890');
    expect(mocks.ConnectionsController).toHaveBeenCalled();
    expect(mocks.attachRoomAndChatd).toHaveBeenCalledWith({ name: '1234567890' }, 'namespaced socket');
  });

});

describe('generateRoomname', function() {

  it('generates a room name', function() {
    expect(roomsController.generateRoomname()).toMatch(/^[a-z0-9\-]{36}$/);
  });

});
