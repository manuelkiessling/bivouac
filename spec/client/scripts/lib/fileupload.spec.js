"use strict";
var jsdom = require('jsdom').jsdom;
jsdom.env('<html><body></body></html>', null, null,
  function(errors, window) {
    global.jQuery = require('jQuery').create(window);
    
    var requirejs = require('requirejs');
    
    requirejs([__dirname + '/../../../../src/client/scripts/lib/fileupload.js'], function(fileupload) {
    
      describe('Fileupload', function() {
    
        it('calls filedrop on dropElement', function() {
          var dropElement = {};
          dropElement.filedrop = createSpy("filedrop spy");
          fileupload.initialize({ dropElement: dropElement });
          expect(dropElement.filedrop).toHaveBeenCalled();
        });
    
      });
    
    });
});
