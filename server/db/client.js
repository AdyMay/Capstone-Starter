const { client } = require("./client");

const createBusiness = async ({ name, image, description }) => {
  try {
    const SQL = `INSERT INTO business(name, image, description) VALUES($1, $2, $3) RETURNING *`;
    const response = await client.query(SQL, [
      name,
      image ||
        "https://plus.unsplash.com/premium_vector-1710425435116-13abfd442d48?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description,
    ]);
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const fetchBusiness = async () => {
  const SQL = `SELECT id, name FROM business;`;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = { createBusiness, fetchBusiness };
