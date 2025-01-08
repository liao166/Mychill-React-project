// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CardGallery = () =>{
//     // const [attractions , setAttractions] = useState([]);
//     // const [selectedRegions , setSelectedRegions] = useState("");
//     // const [selectedTags , setSelectedTags] = useState("");

//     // useEffect(()=>{
//     //     const urlParams = new URLSearchParams(window.location.search);
//     //     const selectSiteCity = urlParams.get('site_city');
//     //     const selectTagId = urlParams.get('tag_id');

//     //     if(selectSiteCity && selectTagId){
//     //         setSelectedRegions(selectSiteCity);
//     //         setSelectedTags(selectTagId);
//     //     }else{
//     //         showRandomAttractions(); 
//     //     }

//     //     // if (!selectedRegions && !selectedTags){
//     //     //     showRandomAttractions(); // 顯示隨機的景點
//     //     // }else{
//     //     //     fetchAttractions();
//     //     // }
//     // },[]);

//     // useEffect(() => {
//     //     if (selectedRegions || selectedTags) {
//     //       fetchAttractions();
//     //     }
//     //   }, [selectedRegions, selectedTags]);
    

//     // const fetchAttractions = () =>{
//     //     axios.get('http://localhost:8080/site/allsite/select', {
//     //         params: {
//     //             site_city: selectedRegions, // 這裡要對應資料庫的命名
//     //             tag_id: selectedTags
//     //         }
//     //     })
//     //     .then(response =>{
//     //         const attractionsData = response.data;
//     //         setAttractions(attractionsData);
//     //     })
//     //     .catch(error =>{
//     //         console.error("fetchAttractions獲取使用者選擇失敗", error);
//     //         alert("無法獲取資料，請稍後再試");
//     //     });
//     // };

//     // const showRandomAttractions = async() =>{
//     //     // 隨機生成景點
//     //     try {
//     //         const response = await axios.get(`http://localhost:8080/site/allsite/all/randomCity`);
//     //         console.log("取得隨機景點資料" , response.data);
//     //         setAttractions(response.data);
//     //     } catch (error) {
//     //         console.error("隨機生成景點錯誤：", error);
//     //     }
//     // };

//     // // const handleRegionChange = (event) => {
//     // //     const values = Array.from(document.querySelectorAll(".cityCheckbox:checked")).map(checkbox => checkbox.value).join(',');
//     // //     setSelectedRegions(values);
//     // // };
//     // // const handleTagChange = (event) => {
//     // //     const values = Array.from(document.querySelectorAll(".tagCheckbox:checked")).map(checkbox => checkbox.value).join(',');
//     // //     setSelectedTags(values);
//     // // };

//     // const handleRegionChange = (value) => {
//     //     setSelectedRegions(value);
//     //   };
    
//     //   const handleTagChange = (value) => {
//     //     setSelectedTags(value);
//     //   };
//     return(
//         <div id="sitecardBox" className="row m-0 justify-content-center">
//             {attractions.length === 0 ?(
//                 <p>沒有符合條件的景點。</p>
//             ):(
//                 attractions.map(attraction => (
//                     <div key={attraction.site_id} className="col-md-3 p-0 m-0">
//                         <div className="siteCard allCard card bg-primary" data-site-id={attraction.site_id}>
//                             <div className="cardImage">
//                                 <img src={`/images/searchSite/${attraction.photo_one}`} />
//                             </div>
//                             <div className="cardOverlay">
//                                 <h5 className="card-title ">{attraction.site_name}</h5>
//                                 <p className="card-subtitle">{attraction.short_add}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     )


// }

import React from "react";
// import { useNavigate } from "react-router-dom";

const CardGallery = ({attractions}) =>{
    // const navigate = useNavigate;
    // const handleClick = (siteId) => {
    //     navigate(`/siteInfo/${siteId}`);
    //   };
    const handleClick = (siteID) => {
        window.location.href = `/siteInfo/${siteID}`;
    };
    return(
        <div id="sitecardBox" className="row m-0 justify-content-center">
            {attractions.length === 0 ?(
                <p>沒有符合條件的景點。</p>
            ):(
                attractions.map(attraction => (
                    <div key={attraction.site_id} className="col-md-3 p-0 m-0" onClick={() => handleClick(attraction.site_id)}>
                        <div className="siteCard allCard card bg-primary" data-site-id={attraction.site_id}>
                            <div className="cardImage">
                                <img src={`/images/searchSite/${attraction.photo_one}`} />
                            </div>
                            <div className="cardOverlay">
                                <h5 className="card-title ">{attraction.site_name}</h5>
                                <p className="card-subtitle">{attraction.short_add}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )


}

export default CardGallery;