import React from 'react';

const FoodCard = ({ place, onSelect }) => {
  const handleCardClick = () => {
    onSelect(place); // 當卡片被點擊時，通知父組件選擇的店家
  };

  return (
    <div className="foodCard card" onClick={handleCardClick}>
      <div className="d-flex">
        <div className="foodImage">
          <img 
            src={place.photos ? place.photos[0].getUrl({ maxWidth: 300 }) : '../assets/images/searchSite/tainan.jpeg'} 
            className="card-img-left" 
            alt={place.name}
          />
        </div>
        <div className="card-body">
          <h6 className="card-title">{place.name}</h6>
          <div className="btnOverlay">
            <button 
              type="button" 
              className="addBtn btn btn-primary loadSchedule" 
              data-site-id={place.place_id}
              data-site-name={place.name} 
              data-site-add={place.formatted_address} 
              data-site-img={place.photos ? place.photos[0].getUrl({ maxWidth: 300 }) : '../assets/images/searchSite/tainan.jpeg'}
            >
              加入行程
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;