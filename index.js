const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "www.youtube.com"],
      objectSrc: ["'none'"],
      frameSrc: ["www.youtube.com"],
      imgSrc: ["tainan-metaverse.s3.ap-northeast-1.amazonaws.com"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled..");
}

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

const port = process.env.PORT || 3200;
app.listen(port, () => console.log(`Listening on port ${port}...`));
