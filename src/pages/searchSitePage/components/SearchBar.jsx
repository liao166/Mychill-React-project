import React, { useState, useEffect } from 'react';

const SearchBar = () => {
   const [selectedCity , setSelectedCity] = useState('');
   const [selectedTag  , setSelectedTag] = useState('');

   useEffect(() => {
       console.log("目前選擇到的城市:", selectedCity);
       console.log("目前選擇到的標籤:", selectedTag);
},[selectedCity,selectedTag]); // 當 selectedCity 或 selectedTag 變化執行時

const handleSearch = () => {
    localStorage.setItem('selectedCity', selectedCity);
    localStorage.setItem('selectedTag', selectedTag);
    
    console.log("---------------");
    console.log(selectedCity); // 確認選擇的城市
    console.log(selectedTag);   // 確認選擇的類別
    window.location.href = `/chill-around-project/pages/allSite.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`;
};

return (
    <div className='searchOverlay container d-flex flex-sm-row align-items-center'>
        <form id='searchForm' className="input-group d-flex justify-content-center align-items-center">
            <div className='selectItem d-flex'>
                <label htmlFor="citySelect" id='regionLabel'>地區</label>
                <select className="custom-select" id="citySelect" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option>請選擇</option>
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
            <div className='selectItem d-flex'>
                <label htmlFor="tagSelect" id='categoryLabel'>類別</label>
                <select className="custom-select" id="tagSelect" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                <option>請選擇</option>
                        <option value="1">藝文場域</option>
                        <option value="2">夜市老街</option>
                        <option value="3">國家公園</option>
                        <option value="4">古蹟寺廟</option>
                        <option value="5">博物館</option>
                        <option value="6">親子共遊</option>
                        <option value="7">觀景平台</option>
                        <option value="8">登山步道</option>
                        <option value="9">浪漫約會</option>
                        <option value="10">生態旅遊</option>
                        <option value="11">主題樂園</option>
                        <option value="12">國家風景區</option>
                        <option value="13">歷史建築</option>
                        <option value="14">露營溫泉</option>
                        <option value="15">戶外踏青</option>
                        <option value="16">看海景</option>
                        <option value="17">觀光工廠</option>
                        <option value="18">地質奇景</option>
                </select>
            </div>
            <div className='input-group-append'>
                <button id='searchButton' className="btn btn-outline-light"
                type='button' onClick={handleSearch}>搜尋</button>
            </div>
        </form>
    </div>
)
};

export default SearchBar;