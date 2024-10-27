const { findUserWithToken } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const user = await findUserWithToken(token);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn };
