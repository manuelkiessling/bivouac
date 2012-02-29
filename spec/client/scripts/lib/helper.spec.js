"use strict";
var requirejs = require('requirejs');

requirejs([__dirname + '/../../../../src/client/scripts/lib/helper.js'], function(helper) {

  describe('urlParam', function() {

    it('finds the correct value of a given GET param', function() {
      expect(helper.urlParam('answer', 'http://www.example.com/foo.bar?question=unknown&answer=42')).toEqual('42');
    });

  });

});
