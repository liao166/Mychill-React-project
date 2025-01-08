// src/pages/siteInfoPage/siteInfo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../components/layout/SearchHeader_trans";
import TopImage from './components/TopImage';
import Carousel from './components/Carousel';
import ImageGallery from './components/ImageGallery';
import SiteInfoDetails from './components/SiteInfoDetails';
import SiteDescription from './components/SiteDescription';

const SiteInfo = () => {
    const { id } = useParams();
    const [siteDetails, setSiteDetails] = useState(null); // 保存景點詳細訊息
    // const params = new URLSearchParams(window.location.search); // 獲取ＵＲＬ參數
    // const siteId = params.get('id'); // 假設URL包含id=1

    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/site/siteinfo/${id}`);
                console.log('景點資料:', response.data);
                setSiteDetails(response.data); // 更新狀態獲取
            } catch (error) {
                console.error('無法獲取景點資料:', error);
            }
        };

        fetchSiteInfo(); //調用函數獲取數據
    }, [id]); // 包含 siteId

    const changeImage = (image) => {
        document.getElementById("mainImage").src = image; // 切換圖片
    };

    if (!siteDetails) {
        return <p>未找到相關景點資訊</p>; // 沒讀到資料時的提示
    }

    const {site_name } = siteDetails;

    return (
        
        <div className="siteInfoPage container-fluid p-0" id="siteInfoPage">
            <Header/>
            {/* 上方大圖 */}
            <TopImage photo={siteDetails.photo_one} />

            {/* 地點訊息 */}
            <section className="siteInfo container row" id="siteInfo">
                {/* 景點標題 */}
                <div className="m-3 container d-flex justify-content-between">
                    <h1 className="text-nowrap fs-2">{site_name}</h1>
                    <div className="divider1"></div>
                </div>

                {/* 手機版輪播圖 */}
                <Carousel photos={[siteDetails.photo_one, siteDetails.photo_two, siteDetails.photo_three, siteDetails.photo_four]} />

                {/* 電腦版圖片 */}
                <ImageGallery photos={[siteDetails.photo_one, siteDetails.photo_two, siteDetails.photo_three, siteDetails.photo_four]} />

                {/* 右側資訊 */}
                <SiteInfoDetails siteDetails={siteDetails} />

                {/* 下方介绍 */}
                <SiteDescription site_info={siteDetails.site_info} />
            </section>
        </div>
    );
};

export default SiteInfo;

