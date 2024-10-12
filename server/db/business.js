const { client } = require("./client");

// CREATE a new business
const createBusiness = async ({ name, image, description }) => {
  try {
    const SQL = `
      INSERT INTO business (name, image, description) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const response = await client.query(SQL, [
      name,
      image ||
        "https://plus.unsplash.com/premium_vector-1710425435116-13abfd442d48?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description,
    ]);
    return response.rows[0];
  } catch (err) {
    console.error("Error creating business:", err);
    throw err;
  }
};

// FETCH all businesses
const fetchBusiness = async () => {
  try {
    const SQL = `
      SELECT id, name, description, image 
      FROM business;
    `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (err) {
    console.error("Error fetching businesses:", err);
    throw err;
  }
};

// FETCH single business by ID
const fetchSingleBusiness = async (id) => {
  try {
    const SQL = `
      SELECT * 
      FROM business 
      WHERE id = $1;
    `;
    const response = await client.query(SQL, [id]);
    return response.rows;
  } catch (err) {
    console.error("Error fetching single business:", err);
    throw err;
  }
};

// FETCH reviews for business
const fetchBusinessReview = async (businessid) => {
  try {
    const SQL = `
      SELECT reviews.id, reviews.text, reviews.rating, reviews.userid, reviews.businessid 
      FROM reviews 
      JOIN business ON reviews.businessid = business.id 
      WHERE business.id = $1;
    `;
    const response = await client.query(SQL, [businessid]);
    return response.rows;
  } catch (err) {
    console.error("Error fetching business reviews:", err);
    throw err;
  }
};

module.exports = {
  createBusiness,
  fetchBusiness,
  fetchSingleBusiness,
  fetchBusinessReview,
};
