const express = require("express");
const router = express.Router();

const { fetchUsers } = require("../db");

// GET /users - Fetch all users
router.get("/", async (req, res, next) => {
  try {
    console.log("fetchUsers", fetchUsers);
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    console.error("Trouble fetching users", error);
    next(error);
  }
});

module.exports = router;
