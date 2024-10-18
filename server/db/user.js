const client = require("./client");

// const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "password";

// CREATE a new user
const createUser = async ({ username, password }) => {
  if (!username || !password) {
    const error = new Error("Username and password required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO users(username, password) VALUES($1, $2) RETURNING *;
  `;
  const response = await client.query(SQL, [
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

// FIND a user by token
const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = new Error("Not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = new Error("Not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

// FETCH all users
const fetchUsers = async () => {
  const SQL = `
    SELECT id, username FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// AUTHENTICATE a user
const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password FROM users WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    !(await bcrypt.compare(password, response.rows[0].password))
  ) {
    const error = new Error("Not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
};

// FETCH a single user by ID
const fetchSingleUsers = async (id) => {
  const SQL = `SELECT * FROM users WHERE id=$1`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

// FETCH reviews written by a specific user
const fetchUserReviews = async (userid) => {
  const SQL = `
    SELECT reviews.id, reviews.text, reviews.rating, reviews.businessid 
    FROM reviews
    WHERE reviews.userid = $1;
  `;
  const response = await client.query(SQL, [userid]);
  return response.rows;
};

module.exports = {
  createUser,
  findUserWithToken,
  fetchUsers,
  authenticate,
  fetchSingleUsers,
  fetchUserReviews,
};
