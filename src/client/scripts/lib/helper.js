"use strict";
define([], function() {

  return {

    urlParam: function(name, url) {
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      if (!results)
      {
        return null;
      }
      return results[1] || null;
    }

  }

});
