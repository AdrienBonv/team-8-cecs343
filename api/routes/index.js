const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const entityRoutes = require("./entity");

router.use("/users/", userRoutes);
router.use("/entities/", entityRoutes);

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
