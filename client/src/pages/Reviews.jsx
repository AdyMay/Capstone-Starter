import React from 'react';
import './Reviews.css'; 

const Reviews = ({ reviews = [] }) => {
  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <p className="review-text">{review.text}</p>
            <p className="review-rating">Rating: {review.rating}/5</p>
            <p className="review-author">By: {review.user?.username || 'Anonymous'}</p>
          </div>
        ))
      ) : (
        <p>No reviews available at the moment.</p>
      )}
    </div>
  );
};

export default Reviews;