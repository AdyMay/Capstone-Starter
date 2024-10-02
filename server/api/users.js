const express = require("express");
const { fetchUsers } = require("../db");
const router = express.Router();

// GET /users - Fetch all users
router.get("/", async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
