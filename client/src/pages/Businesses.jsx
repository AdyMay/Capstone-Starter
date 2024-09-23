// src/pages/Businesses.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './businesses.css';

const Businesses = ({ businesses }) => {
  return (
    <div>
      <h2>Businesses</h2>
      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <div className="business-list">
          {businesses.map((business) => (
            <div key={business.id} className="business-item">
              <h3>{business.name}</h3>
              <p>{business.description || 'No description available.'}</p>
              <Link to={`/businesses/${business.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Businesses;
