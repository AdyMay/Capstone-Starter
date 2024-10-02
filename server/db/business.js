const { client } = require("./client");

// New Business
async function createBusiness({ name, image, description }) {
  const { rows } = await client.query(
    `INSERT INTO business (name, image, description) VALUES ($1, $2, $3) RETURNING id, name, image, description`,
    [name, image, description]
  );
  return rows[0];
}

// All Businesses
async function fetchBusiness() {
  const { rows } = await client.query(
    `SELECT id, name, image, description FROM business`
  );
  return rows;
}

module.exports = {
  createBusiness,
  fetchBusiness,
};
