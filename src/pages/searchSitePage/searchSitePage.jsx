import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../../components/layout/SearchHeader_trans";
import SearchBar from "./components/SearchBar";
import SiteCard from './components/SiteCard';
import FoodCard from './components/FoodCard';

function SearchSite(){
    const [attractions , setAttractions] = useState([]);
    const [foodStores, setFoodStores] = useState([]);

    useEffect(() => {
        const showRandomAttractions = async()=>{
            try{
                const response = await axios.get('http://localhost:8080/site/searchSite/randomSite');
                console.log("---取得資料---");
                console.log(response.data);
                console.log("---取得資料---");
                setAttractions(response.data); // 更新狀態儲存獲取到的景點數據
            }catch(error){
                console.error('隨機取得景點錯誤:', error);
            }
        };
        const showFoodStore = async() => {
            try {
                const response = await axios.get('http://localhost:8080/site/allfood');
                console.log("取得美食店家資料");
                console.log(response.data);
                setFoodStores(response.data);
                
            } catch (error) {
                console.error("獲取店家美食錯誤",error)
            }
        }
        showRandomAttractions();
        showFoodStore();
    },[])

    return(
        <div className="searchSitePage">
            <Header/>
            <div id="hero-image" className="container-fluid p-0" >
                <div className="row no-gutters ms-0 me-0">
                    <div id="image1" className="col-md-12 ps-0 pe-0">
                        <img src="/images/searchSite/Keelung/ZhengbinFishingHarbor.jpg" alt="Image 1"/>
                    </div>
                </div>
            </div>
            <SearchBar/>
            {/*景點推薦title */}
            <div className="container d-flex justify-content-between my-5">
                <h4 className="text-dark text-nowrap fs-2 fw-bolder">景點推薦</h4>
                <div className="textDivider">
                </div>
            </div>
            <div id="recommendCards">
                <div id="sitecardBox" className="row m-0">
                {attractions.map(attraction => (
                    <SiteCard key={attraction.site_id} attraction={attraction} /> 
                ))}
                </div>
            </div>
            <div className="p-5 d-flex justify-content-center">
                <Link to="/allSite" id="moreBtn" className="btn btn-secondary">更多景點推薦</Link>
            </div>
            {/*美食推薦title */}
            <div className="foodTitle py-5">
                <div className="container d-flex justify-content-between">
                    <h4 className="text-light text-nowrap fs-2 fw-bolder">美食推薦</h4>
                    <div className="textDivider2"></div>
                </div>
            </div>    
            <div id="recommendCards">
                <div id="foodcardBox" className="row m-0">
                    {foodStores.map(food =>(
                        <FoodCard key={food.store_id} attraction={food}/>
                    ))}
                </div>
            </div>
            <div className="p-5 d-flex justify-content-center  ">
                    <a href="/chill-around-project/pages/foodMap.html" id="moreBtn" className="btn btn-secondary">更多美食推薦</a>
            </div>

        </div>
        
    )
}

export default SearchSite;