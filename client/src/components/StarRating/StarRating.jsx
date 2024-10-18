import React from "react";
import StarRatings from "react-star-ratings";

const Rating = ({ numberRating }) => {
  const validRating = typeof numberRating === "number" ? numberRating : 0;

  return (
    <StarRatings
      starRatedColor="#E85A4F"
      starEmptyColor="gray"
      rating={validRating} 
      numberOfStars={5}
      starDimension="20px" 
      starSpacing="2px" 
      name="business-rating"
    />
  );
};

export default Rating;