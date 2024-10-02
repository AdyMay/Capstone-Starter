const { client } = require("./client");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT || "shhh";
if (JWT_SECRET === "shhh" && process.env.NODE_ENV === "production") {
  console.error("JWT secret should be set in production environment!");
  process.exit(1);
}

const createUser = async ({ username, password }) => {
  if (!username || !password) {
    const error = new Error("Username and password required!");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const SQL = `
    INSERT INTO users(id, username, password) 
    VALUES($1, $2, $3) 
    RETURNING id, username;
  `;
  const { rows } = await client.query(SQL, [
    uuid.v4(),
    username,
    hashedPassword,
  ]);

  return rows[0];
};

const findUserWithToken = async (token) => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (ex) {
    const error = new Error("Not authorized");
    error.status = 401;
    throw error;
  }

  const SQL = `SELECT id, username FROM users WHERE id = $1`;
  const { rows } = await client.query(SQL, [payload.id]);

  if (!rows.length) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return rows[0];
};

// All Users
const fetchUsers = async () => {
  const SQL = `SELECT id, username FROM users;`;
  const { rows } = await client.query(SQL);
  return rows;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password FROM users WHERE username = $1;
  `;
  const { rows } = await client.query(SQL, [username]);

  if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: rows[0].id }, JWT_SECRET);
  return { token };
};

// Single User
const fetchSingleUsers = async (id) => {
  const SQL = `SELECT id, username FROM users WHERE id = $1`;
  const { rows } = await client.query(SQL, [id]);

  if (!rows.length) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return rows[0];
};

module.exports = {
  createUser,
  findUserWithToken,
  fetchUsers,
  authenticate,
  fetchSingleUsers,
};
