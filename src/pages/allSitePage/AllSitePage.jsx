// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/layout/SearchHeader_trans";
import SelectBlock from "./components/SelectBlock";
import TopImage from "./components/TopImage";
import CardGallery from "./components/CardGallery";

const AllSite = () =>{
    const [attractions , setAttractions] = useState([]);
    const [selectedRegions , setSelectedRegions] = useState([]);
    const [selectedTags , setSelectedTags] = useState([]);

    useEffect(() => {
        if (selectedRegions.length > 0 || selectedTags.length > 0) {
          fetchAttractions();
        } else {
          showRandomAttractions();
        }
    }, [selectedRegions, selectedTags]);
    
    const fetchAttractions = async () => {
        try {
          const response = await axios.get("http://localhost:8080/site/allsite/select", {
            params: {
              site_city: selectedRegions.join(","),
              tag_id: selectedTags.join(","),
            },
          });
          setAttractions(response.data);
        } catch (error) {
          console.error('fetchAttractions獲取使用者選擇失敗:', error);
          alert('無法獲取資料，請稍後再試。');
        }
    };

    const showRandomAttractions = async() =>{
        // 隨機生成景點
        try {
            const response = await axios.get(`http://localhost:8080/site/allsite/all/randomCity`);
            console.log("取得隨機景點資料" , response.data);
            setAttractions(response.data);
        } catch (error) {
            console.error("隨機生成景點錯誤：", error);
        }
    };

    return(
        <div>
            <Header/>
            <div className="allSitePage container-fluid p-0">
                <TopImage/>
                <div className="bottomInfo row pt-2 me-0">
                <SelectBlock
                    selectedRegions={selectedRegions}
                    setSelectedRegions={setSelectedRegions}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
                    <main className="rightCards col-md-9 order-2 order-md-2 me-0">
                        <CardGallery key={attractions.site_id} attractions={attractions} />
                    </main>
                </div>
            </div>
        
        </div>
    )
}

export default AllSite;