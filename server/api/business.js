const express = require("express");
const { fetchBusiness, createBusiness } = require("../db");
const router = express.Router();

// GET /business
router.get("/", async (req, res, next) => {
  try {
    const businesses = await fetchBusiness();
    res.json(businesses);
  } catch (error) {
    next(error);
  }
});

// POST /business/create
router.post("/create", async (req, res, next) => {
  try {
    const business = await createBusiness(req.body);
    res.json(business);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// TODO
