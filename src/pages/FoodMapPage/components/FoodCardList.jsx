import React from 'react';
import FoodCard from './FoodCard';

const FoodCardList = ({ places, onSelectPlace }) => {
  return (
    <div id="foodCardContainer" className="food-card-container">
      {places.map(place => (
        <FoodCard key={place.place_id} place={place} onSelect={onSelectPlace} />
      ))}
    </div>
  );
};

export default FoodCardList;