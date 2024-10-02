// src/pages/Home.jsx
// Summary of businesses, users, and reviews

import React from 'react';

const Home = ({ auth, authAction, logout, businesses = [], users = [], reviews = [] }) => {
  const businessCount = businesses.length;
  const userCount = users.length;
  const reviewCount = reviews.length;

  return (
    <div>
      <h1>Home</h1>
      <p>
        Display some interesting information about our {businessCount}{" "}
        {businessCount === 1 ? "Business" : "Businesses"}
        <br />
        Display some interesting information about our {userCount}{" "}
        {userCount === 1 ? "User" : "Users"}
        <br />
        Display some interesting information about our {reviewCount}{" "}
        {reviewCount === 1 ? "Review" : "Reviews"}
      </p>
    </div>
  );
};

export default Home;
