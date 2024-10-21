// src/pages/Businesses.jsx
// Lists businesses and links 

import "./Businesses.css";
import React from 'react';
import { Link } from 'react-router-dom';

const Businesses = ({ businesses, pageType }) => {
  console.log("business", businesses[0]);
  return (
    <div className={`business-list ${pageType === 'business' ? 'business-page' : ''}`}>
      {businesses.map(business => (
        <div key={business.id} className="business-item">
          <h3>{business.name}</h3>
          <img
            src={business.image || '/default-business.jpg'}
            alt={`${business.name} logo`}
            className={`business-image ${pageType === 'business' ? 'business-page-image' : ''}`}
          />
          <br />
          <Link to={`/business/${business.id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Businesses;