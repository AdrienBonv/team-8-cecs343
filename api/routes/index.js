const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const entityRoutes = require("./entity");
const ratingRoutes = require("./rating");

router.use("/users/", userRoutes);
router.use("/entities/", entityRoutes);
router.use("/ratings/", ratingRoutes);

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
