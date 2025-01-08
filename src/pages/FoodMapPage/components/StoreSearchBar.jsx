import React, { useState, useEffect } from 'react';
const StoreSearchBar = ()=>{
    return(
        <div className="searchOverlay container  d-flex flex-column flex-sm-row align-items-center">
        <div className="input-group justify-content-center align-items-center">
            <div className="seletGroup d-flex justify-content-between">
                <div className="selectItem">
                    <label htmlFor="regionSelect d-flex" id="regionLabel">地區</label>
                    <select className="custom-select" id="myRegion">
                        <option selected>請選擇</option>
                        <option value="Taipei">台北市</option>
                        <option value="NewTaipei">新北市</option>
                        <option value="Keelung">基隆市</option>
                        <option value="Yilan">宜蘭縣</option>
                        <option value="Taoyuan">桃園市</option>
                        <option value="Hsinchu">新竹縣</option>
                        <option value="Miaoli">苗栗縣</option>
                        <option value="Taichung">台中市</option>
                        <option value="Changhua">彰化縣</option>
                        <option value="Nantou">南投縣</option>
                        <option value="Yunlin">雲林縣</option>
                        <option value="Chiayi">嘉義縣</option>
                        <option value="Tainan">台南市</option>
                        <option value="Kaohsiung">高雄市</option>
                        <option value="Pingtung">屏東縣</option>
                        <option value="Hualien">花蓮縣</option>
                        <option value="Taitung">台東縣</option>
                    </select>
                </div>
                <div className="selectItem">
                    <label htmlFor="categorySelect" id="categoryLabel">類別</label>
                    <select className="custom-select" id="foodstoreCategory">
                        <option selected>請選擇</option>
                        <option value="特色小吃">特色小吃</option>
                        <option value="飲料店">飲料店</option>
                        <option value="火鍋店">火鍋店</option>
                        <option value="燒烤店">燒烤店</option>
                        <option value="咖啡廳">咖啡廳</option>
                        <option value="中式料理">中式料理</option>
                        <option value="西式料理">西式料理</option>
                        <option value="義式餐廳">義式餐廳</option>
                        <option value="寵物餐廳">寵物餐廳</option>
                    </select>
                </div>
            </div>
           
            <div className="input-group-append">
                <button id="searchBtn" className="btn btn-outline-light" type="button" >搜尋</button>
            </div>
        </div>
    </div>
    )

};

export default StoreSearchBar;