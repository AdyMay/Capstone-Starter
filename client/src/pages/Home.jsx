// src/pages/Home.jsx
// Summary of businesses, users, and reviews

import React from 'react';
import './home.css'; 

const Home = ({ auth, businesses, users, reviews }) => {
  return (
    <div className="home-container">
      <h1>Welcome to Acme Business Reviews</h1>
      <p>
        We currently have {businesses.length} businesses available.
        <br />
        Join our community of {users.length} users.
        <br />
        Explore {reviews.length} reviews from our users.
      </p>
      {auth.id ? (
        <p className="welcome-message">Hello, {auth.username}! Enjoy browsing.</p>
      ) : (
        <p className="info">Please log in to leave a review or create a business.</p>
      )}
    </div>
  );
};

export default Home;
