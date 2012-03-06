"use strict";
var ConnectionsController = require('../../../../../src/server/app/chatd/controller/connections.js');

describe('ConnectionsController', function() {

  it('creates connectionsController objects', function() {
    var connectionsController = new ConnectionsController();
    expect(typeof(connectionsController.attachRenderer)).toEqual('function');
  });

});
