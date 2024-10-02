const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));

router.use("/users", require("./users"));

router.use("/business", require("./business"));

router.use("/reviews", require("./reviews"));

module.exports = router;
