import { useState, useEffect } from 'react';
import Businessess from './Businesses';

const Rating = ({ businessid }) => {
  const [rating, setRating] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (businessid) {
      calculateBusinessRating(); 
    }
  }, [businessid]); 

  // Calculate Average Rating A Business
  const calculateBusinessRating = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`/api/business/${businessid}/reviews`);
      const allReviews = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      if (allReviews.length > 0) {
        // Calculate Average Rating
        const ratings = allReviews.map((review) => review.rating);
        const sumOfRatings = ratings.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const meanRating = sumOfRatings / ratings.length;
        setRating(meanRating);
      } else {
        setRating('No reviews yet'); 
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating">
      {loading && <p>Loading rating...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && rating && (
        <div>
          <p>Rating: {typeof rating === 'number' ? rating.toFixed(1) : rating}</p>
          {typeof rating === 'number' && (
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={index < Math.round(rating) ? 'filled-star' : 'empty-star'}>
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;