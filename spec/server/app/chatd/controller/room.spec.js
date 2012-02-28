"use strict";
var roomController = require('../../../../../lib/server/app/chatd/controller/room.js');

var mocks = {
  Room: function(name) {
    this.name = name;
  }
};

describe('createRoom', function() {

  it('adds a room to the roomlist', function() {
    spyOn(mocks, 'Room');
    var success = roomController.addRoom('abcdefg', mocks.Room);
    expect(mocks.Room).toHaveBeenCalledWith('abcdefg');
    expect(success).toBeTruthy();
  });

});
