const { client } = require("./client");

const createReview = async (userid, { businessid, text, rating }) => {
  try {
    const SQL = `
      INSERT INTO reviews (userid, businessid, text, rating) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const response = await client.query(SQL, [
      userid,
      businessid,
      text,
      rating,
    ]);
    return response.rows[0];
  } catch (err) {
    console.error("Error creating review:", err);
    throw err;
  }
};

const fetchReview = async () => {
  try {
    const SQL = `
      SELECT reviews.id, reviews.userid, reviews.businessid, reviews.text, reviews.rating, users.username, business.name AS business_name
      FROM reviews
      JOIN users ON reviews.userid = users.id
      JOIN business ON reviews.businessid = business.id;
    `;
    const response = await client.query(SQL);
    return response.rows; // Return All Reviews with Usernames / Businesses
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw err;
  }
};

const fetchBusinessReview = async (businessid) => {
  try {
    const SQL = `
      SELECT reviews.id, reviews.text, reviews.rating, users.username 
      FROM reviews 
      JOIN users ON reviews.userid = users.id
      WHERE reviews.businessid = $1;
    `;
    const response = await client.query(SQL, [businessid]);
    return response.rows; // Return Reviews for Business
  } catch (err) {
    console.error("Error fetching business reviews:", err);
    throw err;
  }
};

const fetchUserReviews = async (userid) => {
  try {
    const SQL = `
      SELECT reviews.id, reviews.text, reviews.rating, business.name AS business_name 
      FROM reviews
      JOIN business ON reviews.businessid = business.id
      WHERE reviews.userid = $1;
    `;
    const response = await client.query(SQL, [userid]);
    return response.rows; // Return Reviews by User w/ Business
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    throw err;
  }
};

module.exports = {
  createReview,
  fetchReview,
  fetchBusinessReview,
  fetchUserReviews,
};
