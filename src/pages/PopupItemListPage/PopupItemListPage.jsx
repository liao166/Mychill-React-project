import React, { useState } from 'react';

const PopupItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // 控制彈窗顯示與否

  const closeModal = () => {
    setIsModalOpen(false); // 關閉 modal
  };

  return (
    <div className="Popup_Item">
      {/* Overlay */}
      {isModalOpen && <div className="overlay" id="overlay" style={{ display: isModalOpen ? 'block' : 'none' }}></div>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" id="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modalContent">
            <div className="closeDiv">
              <button
                className="close"
                onClick={() => window.location.href = './ItemList.html'}
              >
                X
              </button>
            </div>

            <div className="categoryDiv">
              <div className="category">服飾類</div>
              <div className="category">服飾類</div>
              <div className="category">藥品類</div>
            </div>

            <div className="button-container">
              <button id="okBtn" type="button" onClick={closeModal}>
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupItem;
