const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
var session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRoutes = require("./routes/index");

app.use("/api", indexRoutes);

module.exports = app;
