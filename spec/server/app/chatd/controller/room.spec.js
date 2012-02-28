"use strict";
var roomController = require('../../../../../lib/server/app/chatd/controller/room.js');

var mocks = {
  Room: function(name) {
    this.name = name;
  },

  chatdSocket: { of: function() { return 'namespaced socket' } },

  attachRenderer: function(renderer) {},
  attachRoomAndChatd: function(room, chatd) {},
  handleUpload: function(filename, type) {}
};

var connectionController = {
    create: function() {
      return {
        attachRenderer: mocks.attachRenderer,
        attachRoomAndChatd: mocks.attachRoomAndChatd,
        handleUpload: mocks.handleUpload
      }
    }
  }

describe('addRoom', function() {

  it('does not add a room if it was not initialized', function() {
    var success = roomController.addRoom('abcdefg', mocks.Room);
    expect(success).toBeFalsy();
  });

  it('adds a room if it was initialized', function() {
    roomController.init(mocks.chatdSocket, connectionController);
    spyOn(mocks, 'Room');
    var success = roomController.addRoom('abcdefg', mocks.Room);
    expect(mocks.Room).toHaveBeenCalledWith('abcdefg');
    expect(success).toBeTruthy();
  });

  it('adds several rooms', function() {
    var success = roomController.addRoom('hijklmn', mocks.Room);
    expect(success).toBeTruthy();
    var success = roomController.addRoom('opqrstu', mocks.Room);
    expect(success).toBeTruthy();
    var success = roomController.addRoom('vwxyz', mocks.Room);
    expect(success).toBeTruthy();
  });

  it('does not allow to create a room with an existing name', function() {
    roomController.addRoom('abcdefg', mocks.Room);
    var success = roomController.addRoom('abcdefg', mocks.Room);
    expect(success).toBeFalsy();
  });

  it('sets up the connection controller for the new room', function() {
    spyOn(connectionController, 'create').andCallThrough();
    spyOn(mocks, 'attachRoomAndChatd');
    roomController.addRoom('1234567890', mocks.Room);
    expect(connectionController.create).toHaveBeenCalled();
    expect(mocks.attachRoomAndChatd).toHaveBeenCalledWith({ name: '1234567890' }, 'namespaced socket');
  });

});
