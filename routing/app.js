const express = require("express");

const admin = require("./routes/admin");
const newr = require("./routes/newrouter");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("express start");
});

app.use("/admin", admin);
app.use("/newrouter1", newr);

app.listen(port, () => {
  console.log("Express listening on port", port);
});
