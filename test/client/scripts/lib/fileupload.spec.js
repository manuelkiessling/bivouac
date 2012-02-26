"use strict";
var jsdom = require('jsdom').jsdom;
var window = jsdom().createWindow();
global.jQuery = require('jQuery').create(window);

var requirejs = require('requirejs');

requirejs([__dirname + '/../../../../lib/client/scripts/lib/fileupload.js'], function(fileupload) {

  describe('Fileupload', function() {

    it('calls filedrop on dropElement', function() {
      var dropElement = {};
      dropElement.filedrop = createSpy("filedrop spy");
      fileupload.initialize({ dropElement: dropElement });
      expect(dropElement.filedrop).toHaveBeenCalled();
    });

  });

});
