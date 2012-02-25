"use strict";
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
  },

  'new domain.SystemCommunication returns a systemCommunication': function() {
    var systemCommunication = new domain.SystemCommunication(null);
    assert.equal(true, systemCommunication instanceof domain.SystemCommunication);
  },

  'new domain.DownloadCommunication returns a downloadCommunication': function() {
    var downloadCommunication = new domain.DownloadCommunication(null, null);
    assert.equal(true, downloadCommunication instanceof domain.DownloadCommunication);
  }

});
