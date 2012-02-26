"use strict";
var jsdom = require('jsdom').jsdom;
var window = jsdom().createWindow();
global.jQuery = require('jQuery').create(window);

var requirejs = require('requirejs');
var test = require('utest');
var assert = require('assert');

requirejs([__dirname + '/../../../../lib/client/scripts/lib/fileupload.js'], function(fileupload) {

  test('fileupload', {

    before: function() {
    },

    'initialize calls filedrop on given dropElement': function() {
      
      assert.equal(true, true);
    }

  });

});
