"use strict";
var requirejs = require('requirejs');
var test = require('utest');
var assert = require('assert');

requirejs([__dirname + '/../../../../lib/client/scripts/lib/common.js'], function(common) {

  test('common', {

    before: function() {
    },

    'urlParam finds a param': function() {
      global.window = {
        location: {
          href: 'http://www.example.com/foo.bar?question=unknown&answer=42'
        }
      };
      assert.equal('42', common.urlParam('answer'));
    }

  });

});
