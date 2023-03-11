var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET방식
router.get("/api/get/nodejs-api", function (req, res) {
  res.status(200).json({
    message: "hello get api nodejs-api",
  });
});

module.exports = router;
