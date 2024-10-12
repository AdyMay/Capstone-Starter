const express = require("express");
const router = express.Router();

const {
  fetchBusiness,
  fetchSingleBusiness,
  fetchBusinessReview,
} = require("../db");

// GET all businesses
router.get("/", async (req, res, next) => {
  try {
    const businesses = await fetchBusiness();
    res.send(businesses);
  } catch (ex) {
    next(ex);
  }
});

// GET a single business by ID
router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ error: "Invalid business ID" });
  }

  try {
    const business = await fetchSingleBusiness(id);

    // Check the business
    if (!business.length) {
      return res.status(404).send({ error: "Business not found" });
    }

    res.send(business[0]);
  } catch (ex) {
    next(ex);
  }
});

// GET reviews for business by ID
router.get("/:id/reviews", async (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ error: "Invalid business ID" });
  }

  try {
    const reviews = await fetchBusinessReview(id);

    if (!reviews.length) {
      return res
        .status(404)
        .send({ error: "No reviews found for this business" });
    }

    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
