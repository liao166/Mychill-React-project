import React, { useState, useEffect } from "react";
import axios from "axios";

function SchMoreCard({ selectedCities, selectedTags }) {
    const [cards, setCards] = useState([]);
    const [likedSchIds, setLikedSchIds] = useState([]);
    const emailid = localStorage.getItem("emailid");
    const token = localStorage.getItem("token");

    // 隨機選取資料
    const getRandomData = (dataArray, count) => {
        if (dataArray.length <= count) return dataArray;
        return dataArray.sort(() => 0.5 - Math.random()).slice(0, count);
    };

    // 加載已加 Like 的行程
    const loadLikedItems = async () => {
        if (!token) {
            // 未登入，返回空陣列
            return [];
        }
        try {
            const response = await axios.get(`http://localhost:8080/schInfo/getLikedItems/${emailid}`);
            return response.data;
        } catch (error) {
            console.error('無法加載已加 Like 行程:', error);
            return [];
        }
    };

    // 更新卡片
    const updateCards = async () => {
        const selectedRegions = selectedCities.join(",");
        const selectedTagsList = selectedTags.join(",");

        if (!selectedRegions && !selectedTagsList) {
            renderRandomCards();
        } else {
            try {
                const response = await axios.get("http://localhost:8080/schInfo/getsch", {
                    params: {
                        site_city: selectedRegions,
                        tag_id: selectedTagsList,
                    },
                });
                const attractionsData = response.data;
                if (attractionsData.length === 0) {
                    setCards([]);
                } else {
                    const likedItems = await loadLikedItems();
                    setLikedSchIds(likedItems);
                    setCards(attractionsData);
                }
            } catch (error) {
                console.error("更新卡片失敗:", error);
            }
        }
    };

    // 渲染隨機卡片
    const renderRandomCards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/schInfo/getsch");
            const attraction = response.data;
            if (Array.isArray(attraction) && attraction.length > 0) {
                const randomSchData = getRandomData(attraction, 12);
                const likedItems = await loadLikedItems();
                setLikedSchIds(likedItems);
                setCards(randomSchData);
            }
        } catch (error) {
            console.error("隨機卡片渲染失敗:", error);
        }
    };

    // 點擊 Like 按鈕處理
    const toggleLike = async (schId) => {
        //登入判斷式
        if (!token) {
            alert("登入後才能加入收藏!");
            return;
        }
        const postData = { emailid, sch_id: schId };
        try {
            if (likedSchIds.includes(schId)) {
                // 取消 Like
                await axios.delete("http://localhost:8080/schInfo/removeLike", { data: postData });
                setLikedSchIds((prev) => prev.filter((id) => id !== schId));
            } else {
                // 加入 Like
                await axios.post("http://localhost:8080/schInfo/getToLike", postData);
                setLikedSchIds((prev) => [...prev, schId]);
            }
        } catch (error) {
            console.error("無法更新喜好:", error);
        }
    };

    // 當篩選條件變化時，重新加載卡片
    useEffect(() => {
        if (selectedTags.length > 0) {
            updateCards();
        } else {
            renderRandomCards();
        }
    }, [selectedTags]);

    // 渲染卡片
    if (!cards.length) {
        return <h4 className="mt-5">沒有符合條件的行程</h4>;
    }

    return cards.map((card) => {
        const startDate = card.edit_date.slice(0, 10);
        const isLiked = likedSchIds.includes(card.sch_id);

        return (
            <div className="col-md-4 p-0 m-0" key={card.sch_id}>
                <div
                    id="siteCard"
                    className="allCard card bg-primary m-0"
                    data-sch-id={card.sch_id}
                    onClick={() => {
                        localStorage.setItem("selectedSchId", card.sch_id);
                        window.location.href = "schCom";
                    }}
                >
                    <div className="cardImage">
                        <img src={`/images/searchSite/${card.photo_one}`} alt="" />
                    </div>
                    <div className="cardOverlay">
                        <h5 className="card-title">{card.sch_name}</h5>
                        <p className="card-subtitle">{startDate}</p>
                    </div>
                    <div className="btnOverlay">
                        <a
                            className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(card.sch_id);
                            }}
                        ></a>
                    </div>
                </div>
            </div>
        );
    });
}

export default SchMoreCard;
