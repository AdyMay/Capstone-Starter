const client = require("./client");

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
      id UUID PRIMARY KEY,
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
      userid UUID REFERENCES users(id) ON DELETE CASCADE,
      businessid INT REFERENCES business(id) ON DELETE CASCADE,
      text VARCHAR(1023),
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
    );
  `;
  await client.query(SQLreviews);
};

const businesses = [
  {
    name: "Acme Pizza Plaza",
    image:
      "https://www.freepik.com/free-ai-image/baked-firewood-pizza-cooked-rustic-oven-generated-by-ai_41193741.htm#fromView=search&page=1&position=0&uuid=720ebc87-de8a-4052-b84e-58b48550457e",
    description:
      "Gourmet wood-fired pizzas made from the freshest ingredients with unique toppings in a rustic, relaxed environment.",
  },
  {
    name: "Moe's Typewriter Repair Shop",
    image:
      "https://www.freepik.com/premium-ai-image/vintage-typewriter-red-background_260658520.htm#from_view=detail_alsolike",
    description:
      "Vintage typewriter restoration specialists who bring antique machines back to life for collectors and enthusiasts.",
  },
  {
    name: "Lucy's Candy Store",
    image:
      "https://www.freepik.com/free-ai-image/fairy-tale-world-with-delicious-candy_67388443.htm?sign-up=google#from_view=detail_alsolike",
    description:
      "A family-owned sweet shop offering handmade chocolates, candy, and retro treats for all ages, located in the heart of downtown.",
  },
  {
    name: "Mary's Flower Shop",
    image:
      "https://www.freepik.com/premium-ai-image/pollen-flower-plant-flower-flower-pink-plant-petals-flower-petals-day-foreground-nature-fresh_345882812.htm#fromView=search&page=1&position=27&uuid=ec5fc911-0c45-4ba9-9eca-b15528fa2f2f",
    description:
      "A boutique florist specializing in custom arrangements for weddings, events, and everyday occasions, using seasonal blooms and unique floral designs.",
  },
];

const insertBusinesses = async () => {
  try {
    for (const business of businesses) {
      await createBusiness(business);
    }
  } catch (err) {
    console.error(err);
  }
};

const init = async () => {
  console.log("CLIENT", client);
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
