const client = require("../client");
let reviews = [];

// Fetch some users and businesses to use their ids
const usersPromise = client.query("SELECT id FROM users LIMIT 3");
const businessPromise = client.query("SELECT id FROM business LIMIT 3");

Promise.all([usersPromise, businessPromise]).then(
  ([usersResult, businessesResult]) => {
    const users = usersResult.rows;
    const businesses = businessesResult.rows;
    console.log("businesses", businesses[0].id);

    reviews.push({
      userid: users[0].id,
      businessid: businesses[0].id,
      text: "Amazing experience!",
      rating: 5,
    });

    reviews.push({
      userid: users[0].id,
      businessid: businesses[2].id,
      text: "They ate my food before handing it to me!",
      rating: 1,
    });

    reviews.push({
      userid: users[1].id,
      businessid: businesses[1].id,
      text: "Pretty good service!",
      rating: 4,
    });

    reviews.push({
      userid: users[2].id,
      businessid: businesses[2].id,
      text: "Not great, could be better.",
      rating: 2,
    });
  }
);

module.exports = reviews;
