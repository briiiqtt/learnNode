const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("asdf");
});

app
  .route("/hi")
  .get((req, res) => {
    res.send("hi");
  })
  .post((req, res, next) => {
    console.log(req.body);
    res.send("post");
  })
  .put((req, res, next) => {
    console.log(req.body);
    res.send("put");
  })
  .delete((req, res, next) => {
    console.log(req.body);
    res.send("delete");
  });

app.listen(50050, () => {
  console.log("running");
});
