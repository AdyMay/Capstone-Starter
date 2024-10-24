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
  console.log("req", req);
  try {
    const review = await createReview(req.user.id, req.body); //pass in all 4 parameters from reviews db
    console.log("review", review);
    res.send(review);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
