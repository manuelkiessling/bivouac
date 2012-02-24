var test = require('utest');
var assert = require('assert');
var domain = require('../../../lib/server/domain/domain.js');

test('domain', {

  before: function() {
  },

  'new domain.Room returns a room': function() {
    var room = new domain.Room(null, null);
    assert.equal(true, room instanceof domain.Room);
  },

  'new domain.User returns a user': function() {
    var user = new domain.User(null);
    assert.equal(true, user instanceof domain.User);
  },

  'new domain.UserCommunication returns a userCommunication': function() {
    var userCommunication = new domain.UserCommunication(null, null);
    assert.equal(true, userCommunication instanceof domain.UserCommunication);
  }

});
