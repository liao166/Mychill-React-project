import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardWithLike = () => {
    const [cards, setCards] = useState([]); // 儲存卡片資料
    const [likedItems, setLikedItems] = useState([]); // 已喜歡的項目

    const token = localStorage.getItem('token');
    const emailid = localStorage.getItem('emailid');

    // 載入行程卡片和已喜歡項目
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 載入已喜歡項目
                const likedResponse = token
                    ? await axios.get(`http://localhost:8080/schInfo/getLikedItems/${emailid}`)
                    : { data: [] };
                setLikedItems(likedResponse.data);

                // 載入所有行程卡片
                const response = await axios.get('http://localhost:8080/schInfo/getsch');
                const shuffledCards = response.data.sort(() => 0.5 - Math.random()).slice(0, 8);
                setCards(shuffledCards);
            } catch (error) {
                console.error('載入資料時出錯:', error);
            }
        };

        fetchData();
    }, []);
    // [token, emailid]

    // 點擊喜歡按鈕
    const handleLikeButtonClick = async (schId) => {
        if (!token) {
            alert("登入後才能加入收藏!");
            return;
        }

        const isLiked = likedItems.includes(schId);
        const postData = { emailid, sch_id: schId };

        try {
            if (isLiked) {
                await axios.delete('http://localhost:8080/schInfo/removeLike', { data: postData });
                setLikedItems((prev) => prev.filter((id) => id !== schId)); // 移除已喜歡
                alert('已取消');
            } else {
                await axios.post('http://localhost:8080/schInfo/getToLike', postData);
                setLikedItems((prev) => [...prev, schId]); // 加入已喜歡
                alert('加入成功');
            }
        } catch (error) {
            alert(isLiked ? '取消失敗' : '加入失敗');
            console.error('操作時出錯:', error);
        }
    };

    // 點擊卡片跳轉
    const handleCardClick = (schId) => {
        localStorage.setItem('selectedSchId', schId);
        window.location.href = 'schCom';
    };

    return (
        <>
            {cards.map((card) => {
                const startDate = card.edit_date.slice(0, 10);
                const isLiked = likedItems.includes(card.sch_id);
                const heartClass = isLiked ? 'bi-heart-fill' : 'bi-heart';

                return (
                    <div className="col-md-3 p-0 m-0" key={card.sch_id}>
                        <div id="SchCard"
                            className="SchCard card bg-primary"
                            onClick={() => handleCardClick(card.sch_id)}>
                            <div className="SchcardImage">
                                <img src={`./public/images/searchSite/${card.photo_one}`} alt="" />
                            </div>
                            <div className="cardOverlay">
                                <h5 className="card-title">{card.sch_name}</h5>
                                <p className="card-subtitle">{startDate}</p>
                            </div>
                            <div className="btnOverlay">
                                <a
                                    className={`bi ${heartClass}`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 防止冒泡
                                        handleLikeButtonClick(card.sch_id);
                                    }}
                                ></a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CardWithLike;
