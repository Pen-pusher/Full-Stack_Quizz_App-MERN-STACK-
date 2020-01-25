var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ title: "WELCOME TO THE QUIZ APP IN EXPRESS" });
});

module.exports = router;
