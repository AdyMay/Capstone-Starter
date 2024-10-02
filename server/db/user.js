const client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// New User
async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await client.query(
    `INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING id, username`,
    [uuid.v4(), username, hashedPassword]
  );
  return rows[0];
}

async function authenticate({ username, password }) {
  const { rows } = await client.query(
    `SELECT id, username, password FROM users WHERE username = $1`,
    [username]
  );
  if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: rows[0].id }, JWT_SECRET);
  return { token };
}

// All Users
async function fetchUsers() {
  const { rows } = await client.query(`SELECT id, username FROM users`);
  console.log("HERE ROWS :", rows);
  return rows;
}

async function findUserWithToken(token) {
  const { id } = jwt.verify(token, JWT_SECRET);
  const { rows } = await client.query(
    `SELECT id, username FROM users WHERE id = $1`,
    [id]
  );
  return rows[0];
}

module.exports = {
  createUser,
  authenticate,
  fetchUsers,
  findUserWithToken,
};
