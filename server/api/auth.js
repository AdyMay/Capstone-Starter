const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("./utils");
const { authenticate, createUser, findUserWithToken } = require("../db");

// Testing
router.get("/", (req, res) => {
  try {
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send(token); // Send Back Token
  } catch (ex) {
    res.status(401).send({ error: "Invalid username or password" });
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  try {
    // Create the user / authenticate
    const user = await createUser(req.body);
    const token = await authenticate(req.body);
    res.send(token); // Send Back Token
  } catch (ex) {
    if (ex.message.includes("duplicate key value")) {
      res.status(409).send({ error: "Username is already taken" });
    } else {
      next(ex);
    }
  }
});

router.get("/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user); // Return Data
  } catch (ex) {
    res.status(500).send({ error: "Failed to fetch user info" });
    next(ex);
  }
});

module.exports = router;
