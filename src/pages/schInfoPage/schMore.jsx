import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/layout/SearchHeader_trans";
import SchMoreCard from "./components/schMoreCard";
import Footer from "../../components/layout/Footer";

function SchMore() {
    const [citys, getCity] = useState([]);
    const [tags, getTag] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // 獲取參數 tag_id
    useEffect(() => {
        const tag_id = localStorage.getItem('tag_id');
        setSelectedTags(tag_id ? [Number(tag_id)] : []);
    }, [localStorage.getItem('tag_id')]);

    // 獲取縣市地名
    useEffect(() => {
        axios.get('http://localhost:8080/schInfo/city')
            .then((response) => {
                getCity(response.data);
            }).catch((error) => {
                if (error) {
                    alert(error.message);
                }
            });
    }, []);

    // 獲取標籤資料
    useEffect(() => {
        axios.get('http://localhost:8080/schInfo/tag')
            .then((response) => {
                getTag(response.data);
            }).catch((error) => {
                if (error) {
                    alert(error.message);
                }
            });
    }, []);

    // 更新選中的城市
    const handleCityChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCities((prev) =>
            checked ? [...prev, value] : prev.filter((city) => city !== value)
        );
    };

    // 更新選中的標籤
    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        localStorage.removeItem('tag_id'); // 清除 tag_id
        setSelectedTags((prev) =>
            checked ? [...prev, value] : prev.filter((tag) => tag !== value)
        );
    };

    return (
        <div className="_schMore">
            <Header />

            {/* 上方大圖 */}
            <div className="SchtopImage container-fluid p-0 bg-primary">
                <img src="/images/index/5.jpg" className="img-fluid" alt="大圖" />
                <div className="SchTopText">
                    <h1>行程總覽</h1>
                </div>
            </div>

            {/* 下方內容 */}
            <div className="SchBottomInfo row ">
                <aside className="d-flex justify-content-center col-md-3 ">
                    <div className="p-3 selectBlock my-5 ">
                        <h6 className="ps-2 align-items-center ">透過下列選項搜尋</h6>
                        <hr />
                        {/* 下拉選單 */}
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="m-o accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false"
                                        aria-controls="flush-collapseOne">
                                        地區
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="checkBody accordion-body row" id="checkboxContainer">
                                        {/* 地區核取方塊 */}
                                        {citys.map((city) => (
                                            <div className="form-check col-md-6 pb-2" key={city.City_id}>
                                                <input className="form-check-input cityCheckbox" type="checkbox" value={city.City_name_en} id={city.City_name_en} onChange={handleCityChange} />
                                                <label className="form-check-label" htmlFor={city.City_name_en}>{city.City_name_tw}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* 類型 */}
                        <div className="siteType">
                            <p>類型</p>
                            <div className="checkBody accordion-body row" id="checkboxContainer">
                                {tags.map((tag) => (
                                    <div className="form-check pb-2" key={tag.tag_id}>
                                        <input className="form-check-input tagCheckbox" type="checkbox" value={tag.tag_id} id={tag.site_type} defaultChecked={selectedTags.includes(tag.tag_id)} onChange={handleTagChange} />
                                        <label className="form-check-label" htmlFor={tag.site_type}>{tag.tag_name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
                {/* 右側卡片們 */}
                <main className="rightCards col-md-9 me-0">
                    <div id="sitecardBox" className="row m-0 justify-content-center">
                        <SchMoreCard selectedCities={selectedCities} selectedTags={selectedTags} />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default SchMore;