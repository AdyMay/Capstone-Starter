// src/pages/Businesses.jsx
// Lists businesses and links 

import React from 'react';
import './businesses.css'; 

const Businesses = ({ businesses }) => {
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <div className="business-item" key={business.id}>
          <h3>{business.name}</h3>
          <p>{business.description}</p>
          <a href={`/businesses/${business.id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
};

export default Businesses;
