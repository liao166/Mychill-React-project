import React, { useEffect, useState } from "react";
import axios from "axios";

const YtCarousel = () => {
  const [videoData, setYtData] = useState([]);

  useEffect(() => {
    // 載入輪播圖資料
    axios
      .get("http://localhost:8080/schInfo/YtAndBlog")
      .then((response) => {
        const maxVideos = 6; // 限制最多顯示的影片數量
        const fetchedVideos = response.data.slice(0, maxVideos);
        setYtData(fetchedVideos);
      })
      .catch((error) => {
        console.error("無法獲取輪播圖資料:", error);
      });
  }, []);

  useEffect(() => {
    // 在資料加載後初始化 Swiper
    if (videoData.length > 0) {
      new Swiper(".mySwiper_2", {
        spaceBetween: 10,
        slidesPerView: 3,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
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
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      });
    }
  }, [videoData]);

  return (
    <>
      {videoData.map((video) => (
        <div className="swiper-slide">
          <div className="Yt_video">
            <iframe
              width="560"
              height="315"
              src={video.yt_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture; 
              web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </>
  );
};

export default YtCarousel;
