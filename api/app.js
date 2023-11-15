const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRoutes = require("./routes/index");

app.use("/api", indexRoutes);


module.exports = app;