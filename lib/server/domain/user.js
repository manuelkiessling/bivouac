"use strict";
var User = function(id, name) {
  this.id = id;
  this.name = name;
}

User.prototype.getId = function() {
  return this.id;
}

User.prototype.toString = function() {
  return this.id.toString();
}

exports.User = User;
