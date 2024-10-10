const express = require("express");
const { createUser, authenticate } = require("../db");
const router = express.Router();

// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    console.log(token);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
