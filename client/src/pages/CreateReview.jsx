// src/pages/CreateReview.jsx

import React, { useState } from "react";
import "./CreateReview.css";

const CreateReview = ({ businesses, submitReview }) => {
  const [formData, setFormData] = useState({
    businessId: "",
    text: "",
    rating: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(formData);
      setSuccess("Review submitted successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to submit the review.");
      setSuccess(null);
    }
  };

  return (
    <div className="create-review-container">
      <h1>Create Review</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="businessId">Select Business</label>
        <select
          name="businessId"
          value={formData.businessId}
          onChange={handleInputChange}
          required
        >
          <option value="">--Select a business--</option>
          {businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>

        <label htmlFor="text">Review</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Write your review here"
          required
        ></textarea>

        <label htmlFor="rating">Rating</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          required
        >
          <option value="">--Select a rating--</option>
          <option value="1">1 - Very Bad</option>
          <option value="2">2 - Bad</option>
          <option value="3">3 - Okay</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;