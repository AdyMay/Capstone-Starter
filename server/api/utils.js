const { findUserWithToken } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await findUserWithToken(req.headers.authorization);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn };
