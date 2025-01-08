import React from "react";
import Header from "../../components/layout/SearchHeader_trans";
import Map from "./components/Map";
import StoreSearchBar from "./components/StoreSearchBar";

const FoodMap = ()=>{
    return(
        <div>
            <Header/>
            <div className="foodMap container-fluid p-0">
                <StoreSearchBar/>
                <div className="mapBox">
                    <div id="map">
                        <Map/>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default FoodMap;