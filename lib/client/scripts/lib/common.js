"use strict";
define([], function() {

  return {

    urlParam: function(name) {
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (!results)
      {
        return null;
      }
      return results[1] || null;
    }

  }

});
