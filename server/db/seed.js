const client = require("./client");
const businesses = require("./list/businessList.js");
const reviews = require("./list/reviewsList.js");

const {
  createUser,
  fetchUsers,
  createBusiness,
  fetchBusiness,
  createReview,
  fetchReview,
} = require("./index.js");

// Create necessary tables for users, businesses, and reviews
const createTables = async () => {
  const SQLuser = `
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS business;
  DROP TABLE IF EXISTS users;
    
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQLuser);

  const SQLbusiness = `
    CREATE TABLE business (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT 'https://plus.unsplash.com/premium_vector-1710425435116-13abfd442d48?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description VARCHAR(1023)
    );
  `;
  await client.query(SQLbusiness);

  const SQLreviews = `
    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      userid SERIAL REFERENCES users(id) ON DELETE CASCADE,
      businessid INT REFERENCES business(id) ON DELETE CASCADE,
      text VARCHAR(1023),
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
    );
  `;
  await client.query(SQLreviews);
};

const insertBusinesses = async () => {
  try {
    for (const business of businesses) {
      await createBusiness(business);
    }
  } catch (err) {
    console.error(err);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview(review);
    }
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  // console.log("CLIENT", client);
  // await client.connect();
  // console.log("Connected to the database");
  console.log("Initializing");

  try {
    await client.query("BEGIN");

    // Create Tables
    await createTables();
    console.log("Tables created");

    // Create Users
    const [moe, lucy, ethyl, curly] = await Promise.all([
      createUser({ username: "moe", password: "m_pw" }),
      createUser({ username: "lucy", password: "l_pw" }),
      createUser({ username: "ethyl", password: "e_pw" }),
      createUser({ username: "curly", password: "c_pw" }),
    ]);
    console.log("Users created");

    await insertBusinesses();
    console.log("Businesses inserted");

    await insertReviews();
    console.log("Reviews Inserting");

    console.log(await fetchUsers());
    console.log(await fetchBusiness());
    console.log(await fetchReview());

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during initialization", error);
  } finally {
    client.end();
  }
};

init();
