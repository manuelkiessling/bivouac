"use strict";
define(["../vendor/jquery/jquery.filedrop.min"], function() {

  return {

    initialize: function(options) {
      options.dropElement.filedrop({
        paramname: 'file',
        queuefiles: 1,
        maxfilesize: 100, // MB
        url: options.targetUrl,
        dragEnter: options.dragEnterCallback,
        dragLeave: options.dragLeaveCallback,
        beforeEach: options.beforeEachCallback,
        uploadStarted: options.uploadStartedCallback,
        progressUpdated: options.progressUpdatedCallback,
        uploadFinished: options.uploadFinishedCallback,

        error: function(err, file) {
          switch(err) {
            case 'BrowserNotSupported':
              options.errorCallback('Your browser does not support HTML5 file uploads!');
              break;
            case 'TooManyFiles':
              options.errorCallback('Too many files, please select 5 at most!');
              break;
            case 'FileTooLarge':
              options.errorCallback(file.name + ' is too large, only files up to 5 MB are allowed!');
              break;
            default:
              break;
          }
        }
      });
    }

  }

});
