const express = require("express");
const router = express.Router();

const { fetchUsers, fetchSingleUsers } = require("../db");
const { fetchUserReviews } = require("../db");

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.send(users);
  } catch (ex) {
    next(ex);
  }
});

// GET single user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await fetchSingleUsers(id);

    if (!user.length) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user[0]);
  } catch (ex) {
    next(ex);
  }
});

// GET reviews for user by ID
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const reviews = await fetchUserReviews(id);

    if (!reviews.length) {
      return res.status(404).send({ error: "No reviews found for this user" });
    }

    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
