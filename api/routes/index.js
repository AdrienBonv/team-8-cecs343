const express = require("express");
const router = express.Router();

const userRoutes = require("./user");

router.use("/users/", userRoutes);

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
