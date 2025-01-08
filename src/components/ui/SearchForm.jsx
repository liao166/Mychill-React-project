import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 用來進行頁面跳轉

const SearchForm = () => {
  // 使用 useState 管理地區和類別選項
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // 創建 navigate 函數來處理頁面跳轉
  const navigate = useNavigate();

  // 處理地區選擇的變化
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // 處理類別選擇的變化
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  // 處理搜尋按鈕點擊事件
  const handleSearchClick = () => {
    // 檢查選擇的城市和類別
    console.log("選擇的城市:", selectedCity);
    console.log("選擇的類別:", selectedTag);

    // 檢查選擇是否有效
    if (selectedCity || selectedTag) {
      // 使用 React Router 進行頁面跳轉，並將選擇的值作為 URL 查詢參數
      navigate(`/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`);
    } else {
      // 顯示錯誤提示（選擇的城市或類別為空）
      alert("請選擇城市和類別！");
    }
  };

  return (
    <div className="container my-5">
      <div className="searchOverlay2">
        <form id="searchForm" className="input-group2 d-flex align-items-center justify-content-around">
          {/* 地區選擇 */}
          <div className="selectItem d-flex inputRWD">
            <label htmlFor="regionSelect" className="me-3" id="regionLabel">地區</label>
            <select className="custom-select" id="citySelect" value={selectedCity} onChange={handleCityChange}>
              <option value="">請選擇</option>
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

          {/* 類別選擇 */}
          <div className="d-flex inputRWD selectItem">
            <label htmlFor="categorySelect" className="me-3" id="categoryLabel2">類別</label>
            <select className="custom-select2" id="tagSelect" value={selectedTag} onChange={handleTagChange}>
              <option value="">請選擇</option>
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
              <option value="19">一日遊</option>
              <option value="20">二日遊</option>
              <option value="21">三日遊</option>
              <option value="22">一人獨旅</option>
            </select>
          </div>

          {/* 搜尋按鈕 */}
          <div className="input-group-append2">
            <button id="searchButton" className="btn btn-outline-light" type="button" onClick={handleSearchClick}>
              搜尋
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
