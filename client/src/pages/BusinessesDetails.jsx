// src/pages/BusinessDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const BusinessDetails = ({ businesses }) => {
  const { id } = useParams();
  const business = businesses.find(b => b.id === parseInt(id));

  if (!business) {
    return <p>Business</p>;
  }

  return (
    <div>
      <h2>{business.name}</h2>
      <p>{business.description || 'description'}</p>
      <p>Contact: {business.contact || 'Not provided'}</p>
      {/* Details */}
    </div>
  );
};

export default BusinessDetails;
