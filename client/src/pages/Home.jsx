// src/pages/Home.jsx
// Summary of businesses, users, and reviews

import React from 'react';
import { Link } from 'react-router-dom'; 
import './home.css';


const pluralize = (count, singular, plural) => (count === 1 ? singular : plural);

const Home = ({ auth, authAction, logout, businesses = [], users = [], reviews = [] }) => {
  const businessCount = businesses?.length || 0;
  const userCount = users?.length || 0;
  const reviewCount = reviews?.length || 0;

  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>
        Information about our {businessCount}{" "}
        <Link to="/businesses">{pluralize(businessCount, 'Business', 'Businesses')}</Link>
        <br />
        Information about our {userCount}{" "}
        <Link to="/users">{pluralize(userCount, 'User', 'Users')}</Link>
        <br />
        Information about our {reviewCount}{" "}
        <Link to="/reviews">{pluralize(reviewCount, 'Review', 'Reviews')}</Link>
      </p>
    </div>
  );
};

export default Home;
