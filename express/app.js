const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello express!!");
});

app.get("shoney", (req, res) => {
  res.send("shoney hello express!!");
});

app.listen(port, () => {
  console.log("Express Listening on port", port);
});
