const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:5432",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

client.connect((error) => {
  if (error) {
    console.error("Connection Error", error.stack);
  } else {
    console.log("Connected to Postgres");
  }
});

module.exports = client;
