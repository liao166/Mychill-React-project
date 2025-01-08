import React from "react";

const FoodCard = ({attraction}) => {
    
    const handleAddSchedule = (event) =>{
        event.stopPropagation(); // 阻止事件冒泡
        const selectedSiteData = {
            id: attraction.store_id,
            name: attraction.store_name,
            address: attraction.short_store_add,
            img: attraction.photo_one,
        };
        console.log(selectedSiteData);
    };

        return (
            <div className="col-md-3 p-0 m-0">
                <div id="foodCard" className="allCard card bg-primary">
                    <div id="foodImage" className="cardImage">
                        <img src={attraction.photo_two}/>
                    </div>
                    <div className="cardOverlay">
                        <h5 className="card-title">{attraction.store_name}</h5>
                        <p className="card-subtitle">{attraction.short_city}</p>
                    </div>
                    <div className="btnOverlay">
                        <button
                            type="button"
                            className="addBtn btn loadSchedule"
                            onClick={handleAddSchedule}
                        >
                            加入行程
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default FoodCard;