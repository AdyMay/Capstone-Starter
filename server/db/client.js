const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:3000",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

client.connect();

module.exports = client;
