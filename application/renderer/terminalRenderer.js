var render = function(name, message) {
  return "\033[1;32m" + name + " says: \033[0m" + message;
}

exports.render = render;
