const express = require("express");
const { createReview, fetchReview } = require("../db");
const router = express.Router();

// POST /reviews/create
router.post("/create", async (req, res, next) => {
  try {
    const review = await createReview(req.body);
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// GET /reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await fetchReview();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// TODO
