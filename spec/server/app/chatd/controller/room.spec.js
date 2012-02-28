"use strict";
var roomController = require('../../../../../lib/server/app/chatd/controller/room.js');

var mocks = {
  Room: function(name) {
    this.name = name;
  },

  chatd: { getNamespacedChatd: function() { return 'namespaced socket' } },

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
    var success = roomController.addRoom('abcdefg');
    expect(success).toBeFalsy();
  });

  it('adds a room if it was initialized', function() {
    spyOn(mocks, 'Room').andCallThrough();
    roomController.init(mocks.Room, mocks.chatd, connectionController);
    var success = roomController.addRoom('abcdefg');
    expect(mocks.Room).toHaveBeenCalledWith('abcdefg');
    expect(success).toBeTruthy();
  });

  it('adds several rooms', function() {
    var success = roomController.addRoom('hijklmn');
    expect(success).toBeTruthy();
    var success = roomController.addRoom('opqrstu');
    expect(success).toBeTruthy();
    var success = roomController.addRoom('vwxyz');
    expect(success).toBeTruthy();
  });

  it('does not allow to create a room with an existing name', function() {
    roomController.addRoom('abcdefg');
    var success = roomController.addRoom('abcdefg');
    expect(success).toBeFalsy();
  });

  it('sets up the connection controller for the new room', function() {
    spyOn(connectionController, 'create').andCallThrough();
    spyOn(mocks, 'attachRoomAndChatd');
    roomController.addRoom('1234567890');
    expect(connectionController.create).toHaveBeenCalled();
    expect(mocks.attachRoomAndChatd).toHaveBeenCalledWith({ name: '1234567890' }, 'namespaced socket');
  });

});
