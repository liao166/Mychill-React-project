import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

const PopupBudget = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 控制類別視窗是否顯示

  const navigate = useNavigate();

  // 顯示類別視窗的處理函數
  const openCategoryModal = () => {
    setIsCategoryOpen(true); // 設置為 true 顯示視窗
  };

  // 關閉類別視窗的處理函數
  const closeCategoryModal = () => {
    setIsCategoryOpen(false); // 設置為 false 隱藏視窗
  };
  
  const closeMainModal = () => {
    navigate('/budget');
  };


  return (
    <div className="Popup_Budget_Final">
      {/* 主 Budget 編輯視窗 */}
      <div className="EDITPOPUP">
        <div className="overlay" style={{ display: 'block' }}></div>
        <div className="modal" style={{ display: 'block' }}>
          <div className="modalContent">
            <div className="topDiv">
              {/* 點擊 "種類" 會觸發 openCategoryModal 函數 */}
              <a className="category" href="#modal2" onClick={openCategoryModal}>
                種類
              </a>
              <input id="userChooseDate" className="date" type="date" />
              <a href="#" className="close" onClick={closeMainModal}>
                X
              </a>
            </div>
            <form className="middleForm">
              <div>
                <span>金額</span>
                <input id="userMoney" type="text" placeholder="輸入金額" required />
                <br />
                <br />
              </div>
              <div>
                <span>內容</span>
                <input id="userContent" type="text" placeholder="輸入內容" />
                <br />
                <br />
              </div>
              <div>
                <span>已付</span>
                <input id="userCheck" type="checkbox" className="checkBox" />
              </div>
              <div>
                <span>付款人</span>
                <input id="userWhoPaid" type="text" placeholder="輸入付款人" required />
                <br />
                <br />
              </div>
            </form>
            <div className="buttons">
              <button id="deleteBtn" type="button" onClick={() => alert('已刪除')}>
                刪除
              </button>
              <button className="submitBtn" type="submit">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 類別彈窗 */}
      {isCategoryOpen && (
        <div className="CATEGORYPOPUP" style={{ display: 'block' }}>
          <div className="overlay2" style={{ display: 'block' }}></div>
          <div className="modal2" style={{ display: 'block' }}>
            <div className="modalContent2">
              <div className="topDiv2">
                <a className="close2" href="#" onClick={closeCategoryModal}>
                  ＜
                </a>
                <button className="okBtn" onClick={closeCategoryModal}>
                  確認
                </button>
              </div>

              <div className="category2">
                <div className="tiTle">
                  交通111
                  <a>V</a>
                </div>
                <div className="options">
                  <div className="option" data-option="飛機">
                    飛機
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupBudget;
