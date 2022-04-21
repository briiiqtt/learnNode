const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("새로운 라우터");
});

router.get("/newnew", (req, res) => {
  res.send("새새로운 라우터");
});

module.exports = router;
