const loadVar = require("./myvar");

console.log("1", loadVar);
console.log("2", loadVar.a);
console.log("3", loadVar.b);
console.log("4", loadVar.c);

const setVar = new loadVar.c();

console.log("5", loadVar.c);

var test_json = {
  name: {
    name_first: "BEOM SU",
    name_last: "KIM",
  },
  job: {
    job_first: "engineer",
    job_second: "network",
  },
};

console.log("6", setVar.name);
