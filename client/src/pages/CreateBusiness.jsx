// src/pages/CreateBusiness.jsx
// Allows authenticated users to create business

import React, { useState } from 'react';

const CreateBusiness = () => {
  const [business, setBusiness] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace the URL with your actual API endpoint
    const response = await fetch('/api/businesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token'), // Use token for authorization
      },
      body: JSON.stringify(business),
    });

    if (response.ok) {
      const newBusiness = await response.json();
      console.log('Business created:', newBusiness);
      // Optionally redirect or reset form
    } else {
      console.error('Failed to create business:', await response.json());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Business</h2>
      <input
        type="text"
        name="name"
        placeholder="Business Name"
        value={business.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Business Description"
        value={business.description}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Business</button>
    </form>
  );
};

export default CreateBusiness;

