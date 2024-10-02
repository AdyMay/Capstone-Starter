const express = require("express");
const router = express.Router();

const { fetchBusiness, fetchSingleBusiness } = require("../db");

// GET /api/business - All Businesses
router.get("/", async (req, res, next) => {
  try {
    const businesses = await fetchBusiness();
    res.json(businesses);
  } catch (err) {
    next(err);
  }
});

// GET /api/business/:id - Single Business
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid business ID" });
    }

    const business = await fetchSingleBusiness(id);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(business);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
