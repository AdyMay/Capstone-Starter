const { client } = require("./client");

const {
  createUser,
  fetchUsers,
  createBusiness,
  fetchBusiness,
} = require("./index.js");

const createTables = async () => {
  const SQLuser = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQLuser);

  const SQLbusiness = `
    DROP TABLE IF EXISTS business;
    CREATE TABLE business(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) DEFAULT 'https://plus.unsplash.com/premium_vector-1710425435116-13abfd442d48?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description VARCHAR(1023)
    );
  `;
  await client.query(SQLbusiness);
};

const businesses = [
  {
    name: "Acme Pizza",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
    description:
      "New York style pizza & Other Italian classics are provided at this cozy pizzeria.",
  },
  {
    name: "Moe's Typewriter Repair",
    image:
      "https://cdn11.bigcommerce.com/s-r2o17ymkxr/images/stencil/832x750/uploaded_images/052819-making-a-comeback-11-shocking-facts-on-the-history-of-typewritershistoryoftypewriters400x.jpg?t=1567084857",
    description: "Specializing in typewriter sales, repairs, and maintenance.",
  },
  {
    name: "Lucy's Candy Shop",
    image:
      "https://media.architecturaldigest.com/photos/55e7658d302ba71f3016531d/4:3/w_800,h_600,c_limit/dam-images-architecture-2015-02-candy-shops-beautiful-candy-shops-01-dylans-candy-bar.jpg",
    description:
      "Colorful retail chain offering classic & oversized candy, plus apparel, accessories & novelty gifts.",
  },
  {
    name: "Mary's Flower Shop",
    image:
      "https://mspmag.com/downloads/61859/download/image002.jpg?cb=de465bc50a9e5635ec2a607d7d4f453c&w=1280",
    description:
      "Independently owned flower shop with custom & premade arrangements using seasonal & exotic blooms.",
  },
];

const insertBusinesses = async () => {
  try {
    for (const business of businesses) {
      await createBusiness(business);
    }
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  await insertBusinesses();
  console.log("businesses created");

  console.log(await fetchUsers());

  console.log(await fetchBusiness());

  client.end();
};

init();
