// src/pages/BusinessDetails.jsx
// Displays information about business

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BusinessDetails = () => {
  const { id } = useParams(); // business ID from the URL parameters
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(`/api/businesses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch business details');
        }
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found.</div>;
  }

  return (
    <div className="business-details">
      <h2>{business.name}</h2>
      <p>{business.description}</p>
      <p><strong>Location:</strong> {business.location}</p>
      <p><strong>Contact:</strong> {business.contact}</p>
      {/* Add fields */}
    </div>
  );
};

export default BusinessDetails;

