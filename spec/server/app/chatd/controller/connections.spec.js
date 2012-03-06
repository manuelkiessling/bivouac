"use strict";
var ConnectionsController = require('../../../../../src/server/app/chatd/controller/connections.js');

describe('ConnectionsController', function() {

  it('creates connectionsController objects', function() {
    var connectionsController = new ConnectionsController();
    expect(typeof(connectionsController.attachRenderer)).toEqual('function');
    expect(typeof(connectionsController.attachRoomAndChatd)).toEqual('function');
    expect(typeof(connectionsController.sendDownloadCommunication)).toEqual('function');
  });

  it('does not provide objects where deliver() is public', function() {
    var connectionsController = new ConnectionsController();
    expect(typeof(connectionsController.deliver)).toEqual('undefined');
  });

});
