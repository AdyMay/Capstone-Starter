const express = require("express");
const router = express.Router();

const { fetchReview, createReview } = require("../db");
const { isLoggedIn } = require("./utils");

// All Reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await fetchReview();
    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    // Use req.user.id (from isLoggedIn middleware) and review data from req.body
    const review = await createReview(req.user.id, req.body);
    res.send(review);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
