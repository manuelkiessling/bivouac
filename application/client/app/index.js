$(document).ready(function() {
  // Close the username modal when user hits enter
  $('#username').keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      $('#loginModal').modal('hide');
      return false;
    }
  });

  // start the chat when the username modal closes
  $('#username').focus();
  $('#loginModal').modal();
  $('#loginModal').on('hide', function () {
    var chat = bivouac.chat.start($('#username').val());
    bivouac.chat.handleInput(chat, $('#input'));
    bivouac.chat.handleOutput(chat, $('#messages'));
  });

  // initialize the drag&drop file upload
  bivouac.fileupload.initialize({
    dropElement: $('#filedroparea'),
    targetUrl: '/upload',

    dragEnterCallback: function() {
      $('#messages').addClass('filehover');
    },

    dragLeaveCallback: function() {
      $('#messages').removeClass('filehover');
    },

    uploadStartedCallback: function(i, file, len) {
      $('#messages').removeClass('filehover');
    },

    progressUpdated: function(i, file, progress) {

    },

    uploadFinishedCallback: function(i, file, response){

    },

    errorCallback: function(message) {
      $('#messages').removeClass('filehover');
      window.alert(message);
    }
  });
});
