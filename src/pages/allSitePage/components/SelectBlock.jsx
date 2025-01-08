import React from "react";

const SelectBlock = ({ selectedRegions, setSelectedRegions, selectedTags, setSelectedTags }) =>{
    const handleRegionChange = (event) =>{
        const value = event.target.value;
        const checked = event.target.checked;
        setSelectedRegions(prevRegions =>
            checked? [...prevRegions, value] : prevRegions.filter(region => region!== value)
        );
    };
    const handleTagChange = (event) =>{
        const value = event.target.value;
        const checked = event.target.checked;
        setSelectedTags(prevTags =>
            checked? [...prevTags, value] : prevTags.filter(tag => tag!== value)
        );
    };


    return(
    <aside className="col-md-3 order-1 order-md-1 sidebar">
        <div className="p-3 selectBlock">
            <h6 className="ps-2 align-items-center">透過下列選項搜尋</h6>
            <hr/>
            {/*下拉選單 */}
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="m-o accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      地區
                    </button>
                  </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="checkBody accordion-body row" id="checkboxContainer">
                       {/*地區核取方塊 */}
                            <div className="form-check col-md-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Taipei" id="Taipei" onChange={handleRegionChange} checked={selectedRegions.includes('Taipei')}/>
                            <label className="form-check-label" htmlFor="Taipei">台北市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="NewTaipei" id="NewTaipei" onChange={handleRegionChange} checked={selectedRegions.includes('NewTaipei')} />
                            <label className="form-check-label" htmlFor="NewTaipei">新北市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Keelung" id="Keelung" onChange={handleRegionChange} checked={selectedRegions.includes('Keelung')}/>
                            <label className="form-check-label" htmlFor="Keelung">基隆市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Yilan" id="Yilan" onChange={handleRegionChange} checked={selectedRegions.includes('Yilan')}/>
                            <label className="form-check-label" htmlFor="Yilan">宜蘭縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Taoyuan" id="Taoyuan" onChange={handleRegionChange} checked={selectedRegions.includes('Taoyuan')}/>
                            <label className="form-check-label" htmlFor="Taoyuan">桃園市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Hsinchu" id="Hsinchu" onChange={handleRegionChange} checked={selectedRegions.includes('Hsinchu')}/>
                            <label className="form-check-label" htmlFor="Hsinchu">新竹縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Miaoli" id="Miaoli" onChange={handleRegionChange} checked={selectedRegions.includes('Miaoli')}/>
                            <label className="form-check-label" htmlFor="Miaoli">苗栗縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Taichung" id="Taichung" onChange={handleRegionChange} checked={selectedRegions.includes('Taichung')}/>
                            <label className="form-check-label" htmlFor="Taichung">台中市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Changhua" id="Changhua" onChange={handleRegionChange} checked={selectedRegions.includes('Changhua')}/>
                            <label className="form-check-label" htmlFor="Changhua">彰化縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Nantou" id="Nantou" onChange={handleRegionChange} checked={selectedRegions.includes('Nantou')}/>
                            <label className="form-check-label" htmlFor="Nantou">南投縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Yunlin" id="Yunlin" onChange={handleRegionChange} checked={selectedRegions.includes('Yunlin')}/>
                            <label className="form-check-label" htmlFor="Yunlin">雲林縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Chiayi" id="Chiayi" onChange={handleRegionChange} checked={selectedRegions.includes('Chiayi')}/>
                            <label className="form-check-label" htmlFor="Chiayi">嘉義縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Tainan" id="Tainan" onChange={handleRegionChange} checked={selectedRegions.includes('Tainan')}/>
                            <label className="form-check-label" htmlFor="Tainan">台南市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Kaohsiung" id="Kaohsiung" onChange={handleRegionChange} checked={selectedRegions.includes('Kaohsiung')}/>
                            <label className="form-check-label" htmlFor="Kaohsiung">高雄市</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Pingtung" id="Pingtung" onChange={handleRegionChange} checked={selectedRegions.includes('Pingtung')}/>
                            <label className="form-check-label" htmlFor="Pingtung">屏東縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Hualien" id="Hualien" onChange={handleRegionChange} checked={selectedRegions.includes('Hualien')}/>
                            <label className="form-check-label" htmlFor="Hualien">花蓮縣</label>
                            </div>
                            <div className="form-check col-6 pb-2">
                            <input className="form-check-input cityCheckbox" type="checkbox" value="Taitung" id="Taitung" onChange={handleRegionChange} checked={selectedRegions.includes('Taitung')}/>
                            <label className="form-check-label" htmlFor="Taitung">台東縣</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <hr/>
            {/* 類型 */}
            <div className="siteType">
                <p>類型</p>
                <div className="checkBody accordion-body row" id="checkboxContainer">
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="1" id="art" onChange={handleTagChange} checked={selectedTags.includes("1")}/>
                        <label className="form-check-label" htmlFor="art">藝文場域</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="2" id="nightMarket" onChange={handleTagChange} checked={selectedTags.includes("2")}/>
                        <label className="form-check-label" htmlFor="nightMarket">夜市老街</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="3" id="nationPark" onChange={handleTagChange} checked={selectedTags.includes("3")}/>
                        <label className="form-check-label" htmlFor="nationPark">國家公園</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="4" id="temple" onChange={handleTagChange} checked={selectedTags.includes("4")}/>
                        <label className="form-check-label" htmlFor="temple">古蹟寺廟</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="5" id="museum" onChange={handleTagChange} checked={selectedTags.includes("5")}/>
                        <label className="form-check-label" htmlFor="museum">博物館</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="6" id="child" onChange={handleTagChange} checked={selectedTags.includes("6")}/>
                        <label className="form-check-label" htmlFor="child">親子共遊</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="7" id="viewing" onChange={handleTagChange} checked={selectedTags.includes("7")}/>
                        <label className="form-check-label" htmlFor="viewing">觀景平台</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="8" id="climbing" onChange={handleTagChange} checked={selectedTags.includes("8")}/>
                        <label className="form-check-label" htmlFor="climbing">登山步道</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="9" id="date" onChange={handleTagChange} checked={selectedTags.includes("9")}/>
                        <label className="form-check-label" htmlFor="date">浪漫約會</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="10" id="nature" onChange={handleTagChange} checked={selectedTags.includes("10")}/>
                        <label className="form-check-label" htmlFor="nature">生態旅遊</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="11" id="themePark" onChange={handleTagChange} checked={selectedTags.includes("11")}/>
                        <label className="form-check-label" htmlFor="themePark">主題樂園</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="12" id="scenicArea" onChange={handleTagChange} checked={selectedTags.includes("12")}/>
                        <label className="form-check-label" htmlFor="scenicArea">國家風景區</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="13" id="history" onChange={handleTagChange} checked={selectedTags.includes("13")}/>
                        <label className="form-check-label" htmlFor="history">歷史建築</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="14" id="camping" onChange={handleTagChange} checked={selectedTags.includes("14")}/>
                        <label className="form-check-label" htmlFor="camping">露營溫泉</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="15" id="outdoor" onChange={handleTagChange} checked={selectedTags.includes("15")}/>
                        <label className="form-check-label" htmlFor="outdoor">戶外踏青</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="16" id="sea" onChange={handleTagChange} checked={selectedTags.includes("16")}/>
                        <label className="form-check-label" htmlFor="sea">看海景</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="17" id="factory" onChange={handleTagChange} checked={selectedTags.includes("17")}/>
                        <label className="form-check-label" htmlFor="factory">觀光工廠</label>
                    </div>
                    <div className="form-check pb-2">
                        <input className="form-check-input tagCheckbox" type="checkbox" value="18" id="geological" onChange={handleTagChange} checked={selectedTags.includes("18")}/>
                        <label className="form-check-label" htmlFor="geological">地質奇景</label>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    );
}

export default SelectBlock;