# bivouac
Zero-setup non-public group chat with super-easy file sharing

![Screenshots](http://manuelkiessling.github.com/bivouac/assets/images/github-screenshot-box.png)

## About

bivouac provides an open source software package which allows to easily setup
and run web-based group chats with dead-simple file-sharing (drag a file into
the chat, and it's immediately available as a download for all chat members).

Besides these "feature goals", my secondary goal is to learn how to architect
Node.js applications that are relatively complex, with domain-driven design
and a strong separation of concerns in mind.

bivouac is written in JavaScript, for the Node.js platform.


## Installation

Once the current stable release of Node.js is installed, follow these steps to
start the chat server:

    git clone git://github.com/ManuelKiessling/bivouac.git
    cd bivouac
    npm install
    node ./bivouac.js

Then open your browser and point it at http://localhost:8080/

## Get in touch

Find me on Twitter as [@manuelkiessling](https://twitter.com/manuelkiessling) or send me an email at [manuel@kiessling.net](mailto:manuel@kiessling.net)

## License

Copyright (c) 2012, Manuel Kiessling

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
- Neither the name of Manuel Kiessling nor the names of his contributors may
  be used to endorse or promote products derived from this software without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
