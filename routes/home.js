const express = require("express");
const useragent = require("express-useragent");
const router = express.Router();

router.get("/", (req, res) => {
  var source = req.headers["user-agent"];
  var ua = useragent.parse(source);
  let isMobile = ua.isMobile;
  //console.log("isMobile: " + isMobile);
  let title = "周周達人帶路活動";

  let locals = {
    title: title,
    isMobile: isMobile,
  };

  res.render("index", locals);
});

module.exports = router;
