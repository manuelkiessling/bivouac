"use strict";
define(["jquery",
        "../lib/chat",
        "../lib/fileupload",
        "../lib/helper",
        "common",
        "/socket.io/socket.io.js"],

        function($, chat, fileupload, helper) {
          var $loginModal = $('#loginModal'),
              $messages = $('#messages'),
              $sidebar = $('#sidebar'),
              $uploadprogressarea = $('#uploadprogressarea'),
              $username = $('#username'),
              roomname = helper.urlParam('roomname', window.location.href);

          $(document).ready(function() {
            // Close the username modal when user hits enter
            $username.on('keypress', function(e) {
              if (e.which == 13) {
                e.preventDefault();
                $loginModal.modal('hide');
                // Fade the sidebar after some time
                setTimeout(function() {
                  $sidebar
                    .fadeTo(4000, 0.3)
                    .find('p').on('mouseenter', function() {
                        $sidebar.fadeTo('fast', 1.0);
                    });
                }, 10000);
                return false;
              }
            });

            // Maximize message area
            var resizeChatArea = function() {
              $messages
                .height(($('body').height() - 180) + 'px')
                .scrollTop(999999);
            }
            resizeChatArea();
            $(window).resize(resizeChatArea);

            // start the chat when the username modal closes
            $username.focus();
            $loginModal.modal();
            $loginModal.on('hide', function () {
              var chatSocket = chat.start(io, $username.val(), roomname);
              chat.handleInput(chatSocket, $('#input'));
              chat.handleOutput(chatSocket, $messages);
            });

            // initialize the drag&drop file upload
            fileupload.initialize({
              dropElement: $('#filedroparea'),

              targetUrl: '/upload?roomname=' + roomname,

              dragEnterCallback: function() {
                $messages.addClass('filehover');
              },

              dragLeaveCallback: function() {
                $messages.removeClass('filehover');
              },

              beforeEachCallback: function() {
                $uploadprogressarea.fadeIn('fast');
                $messages.removeClass('filehover');
              },

              uploadStartedCallback: function(i, file, len) {

              },

              progressUpdatedCallback: function(i, file, progress) {
              },

              uploadFinishedCallback: function(i, file, response){
                $uploadprogressarea.fadeOut('fast');
              },

              errorCallback: function(message) {
                $uploadprogressarea.hide();
                $messages.removeClass('filehover');
                window.alert(message);
              }
            });
          });
        }

);
