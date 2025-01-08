import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import axios from 'axios';

const SwiperCarousel = () => {
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    // 載入輪播圖資料
    axios.get('http://localhost:8080/heroCarousel')
      .then(response => {
        setHeroData(response.data);
      })
      .catch(error => {
        console.error('無法獲取輪播圖資料:', error);
      });
  }, []);

  return (
    <>
      {/* Swiper 容器 */}
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        >

        {heroData.map((hero) => (
          <SwiperSlide key={hero.info_id}>
            <div
              className="hero-image"
              style={{
                backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                  ), url('./public/images/index/${hero.carousel_Img}')`,
              }}
            >
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="col-md-6 hero-text">
                    <h1>{hero.carousel_tw}</h1>
                    <p>{hero.carousel_en}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
};

export default SwiperCarousel;
