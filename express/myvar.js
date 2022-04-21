module.exports.a = "hello a";
module.exports.b = "hello b";

function myFunc() {
  this.name = "my instance";
}

module.exports.c = myFunc;
