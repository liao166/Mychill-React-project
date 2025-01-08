import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 來處理頁面跳轉
import Aside from '../../components/layout/Aside';

const ItemList = () => {
    // 狀態管理：進度條與物品
    const [progress, setProgress] = useState(50); // 假設初始進度是 50%
    const [items, setItems] = useState([
        { category: '衣物類', completed: 5, total: 10 },
        { category: '衣物類', completed: 5, total: 10 },
    ]);

    // 狀態管理：彈出視窗顯示
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 0
    });

    // 增加物品
    const addItem = () => {
        setIsModalOpen(true); // 顯示彈出視窗
    };

    // 提交新增物品
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.name && newItem.quantity > 0) {
            setItems([...items, { category: newItem.name, completed: 0, total: newItem.quantity }]);
            setIsModalOpen(false); // 關閉彈出視窗
            setNewItem({ name: '', quantity: 0 }); // 清空輸入框
        }
    };

    // 改變輸入的值
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="ItemList">
            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-md-1 col-2 p-0 allcolume">
                        <div className="text-white leftbarDiv">
                            {/* 左側邊欄內容 */}
                            <Aside />
                        </div>
                    </div>

                    <div className="col-md-7 col-6 p-0 allcolume">
                        <div className="text-white mtopDiv">
                            <div className="circle-background"></div>
                            <span id="itemTitle">物品清單</span>
                            <a href="./editPlan.html">返回編輯計畫</a>
                            <button id="leftBtn" onClick={addItem}>增加+</button>
                        </div>
                        <div className="categoryDiv">
                            <div className="categoryDiv2">
                                <span className="categoryText">東西已備妥了嗎?</span>
                                <div className="progressDiv">
                                    <span className="progressNumber">準備進度</span>
                                    <div id="progress-container">
                                        <div
                                            id="progress-bar"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="categoryContainer">
                                    <div className="categoryContent">
                                        <input type="checkbox" className="checkBOX left" />
                                        <span className="itemContent left">需要帶些什麼?</span>
                                        <input type="number" className="itemQuantity right" min="1" value="0" />
                                        <button className="leftDelete right">–</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-4 p-0 allcolume">
                        <div className="text-white rightbarDiv">
                            <Link to="/popupitemlist">
                                <button className="rightBtn">增加+</button>
                            </Link>
                            <div className="container mt-3">
                                <div className="row cardRow">
                                    {items.map((item, index) => (
                                        <div key={index} className="col-md-4 col-4 mb-3 cardOut">
                                            <div className="card">
                                                <button
                                                    className="rightDelete"
                                                    onClick={() => {
                                                        const updatedItems = items.filter((_, i) => i !== index);
                                                        setItems(updatedItems);
                                                    }}
                                                >
                                                    –
                                                </button>
                                                <img
                                                    src="../assets/images/Budget_Item/Items/clothes.png"
                                                    className="cardImg"
                                                    alt="卡片圖片"
                                                />
                                                <div className="card-body">
                                                    <span>{item.category}</span>
                                                    <span>{`${item.completed}/${item.total}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 彈出視窗 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>新增物品細項</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">物品名稱</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newItem.name}
                                    onChange={handleChange}  // 必須提供 onChange 來處理變動
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity">數量</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={newItem.quantity}
                                    onChange={handleChange}  // 必須提供 onChange 來處理變動
                                    min="1"
                                    required
                                />
                            </div>
                            <button type="submit">確定</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>取消</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemList;
