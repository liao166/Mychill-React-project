import React from "react";

const SiteCard = ({attraction}) => {
    const handleClick = () => {
        window.location.href = `/siteInfo/${attraction.site_id}`;
    };
    const handleAddSchedule = (event) =>{
        event.stopPropagation(); // 阻止事件冒泡
        const selectedSiteData = {
            id: attraction.site_id,
            name: attraction.site_name,
            address: attraction.short_site_add,
            info: attraction.site_info,
            img: attraction.photo_one,
        };
        console.log(selectedSiteData);
    };

        return (
            <div className="col-md-3 p-0 m-0" onClick={handleClick}>
                <div id="siteCard" className="allCard card bg-primary">
                    <div className="cardImage">
                        <img src={`/images/searchSite/${attraction.photo_two}`} alt={attraction.site_name} />
                    </div>
                    <div className="cardOverlay">
                        <h5 className="card-title">{attraction.site_name}</h5>
                        <p className="card-subtitle">{attraction.short_add}</p>
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

export default SiteCard;