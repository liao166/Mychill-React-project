import React, { useEffect, useState } from "react";
import axios from "axios";

const TopCarousel = () => {
  const [dataSite, setTopData] = useState([]);
  const maxCards = 10; // 設定顯示卡片的最大數量

  useEffect(() => {
    // 載入輪播圖資料
    axios
      .get("http://localhost:8080/schInfo/getsch")
      .then((response) => {
        const shuffledSites = response.data.sort(() => 0.5 - Math.random());
        setTopData(shuffledSites.slice(0, maxCards)); // 隨機排序並限制數量
      })
      .catch((error) => {
        console.error("無法獲取輪播圖資料:", error);
      });
  }, []);

  useEffect(() => {
    // 在資料加載後初始化 Swiper
    if (dataSite.length > 0) {
      new Swiper(".mySwiper_1", {
        spaceBetween: 0,
        slidesPerView: 4,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination_1",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next_1",
          prevEl: ".swiper-button-prev_1",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        },
      });
    }
  }, [dataSite]);

  // 點擊卡片後處理邏輯
  const handleCardClick = (schId) => {
    localStorage.setItem("selectedSchId", schId); // 存儲到 localStorage
    console.log(schId);
    // window.location.href = "schCom.html"; // 跳轉頁面
  };

  return (
    <>
      {/* Swiper 容器 */}
      {dataSite.map((data) => (
        <div className="swiper-slide" key={data.sch_id}>
          <div
            id="siteCard"
            className="TopCard card "
            data-sch-id={data.sch_id}
            onClick={() => handleCardClick(data.sch_id)}
          >
            <div className="TopcardImage">
              <img 
                src={`./public/images/searchSite/${data.photo_one}`} 
                alt="" 
                />
            </div>
            <div className="TopcardOverlay">
              <h5 className="card-title ">{data.sch_name}</h5>
              <p className="card-subtitle">
                {data.edit_date.slice(0, 10)} 
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCarousel;
