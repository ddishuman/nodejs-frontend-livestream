const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "周周達人帶路活動", message: "Hello" });
});

module.exports = router;
