const client = require("./client");

// New Review
async function createReview({ userid, businessid, text, rating }) {
  const { rows } = await client.query(
    `INSERT INTO reviews (userid, businessid, text, rating) VALUES ($1, $2, $3, $4) RETURNING id, text, rating;`,
    [userid, businessid, text, rating]
  );
  return rows[0];
}

// All Reviews
async function fetchReview() {
  const { rows } = await client.query(`SELECT * FROM reviews;`);
  return rows;
}

module.exports = {
  createReview,
  fetchReview,
};
