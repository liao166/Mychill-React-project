localStorage.setItem("scheduleId", "2");

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
// import PopupBudget from '../PopupBudgetPage/PopupBudgetPage'; // 假設你已經將 PopupBudget.js 放在同一個資料夾
// import Aside from '../../components/layout/Aside';


// function BudgetPage() {
//   // 初始化 useNavigate
//   const navigate = useNavigate();

//   // 處理按鈕點擊，顯示彈窗並導航到新頁面
//   const handleButtonClick = () => {
//     navigate('/popupbudget'); // 跳轉到 PopupBudgetPage
//   };

//   return (
//     <div className="BudegetPage">
//       <div className="container-fluid">
//         <div className="row d-flex">
//           <div className="col-md-1 col-2 p-0 allcolume">
//             <div className="leftbarDiv">
//               {/* 假設這是布局的 sidebar 會用到外部組件 */}
//               <Aside />
//             </div>
//           </div>
//           <div className="col-md-8 col-6 p-0 allcolume">
//             <div className="text-white mtopDiv">
//               <div className="circle-background"></div>
//               <span id="budgetTitle">預算清單</span>
//               <a href="./editPlan.html">返回編輯計畫<br /></a>
//               <button className="increaseBtn" onClick={handleButtonClick}>
//                 增加+
//               </button>
//             </div>
//             <div className="historyDiv">
//               <div className="dayHistory">
//                 <span className="historyDate">2024/12/13</span>
//                 <div className="historyContent">
//                   <img src="../assets/images/Budget_Item/Items/clothes.png" alt="clothes" />
//                   <span className="leftCategory">住宿 飯店</span>
//                   <span className="unpaid">未付 </span>
//                   <span className="rightMoney">$5000</span>
//                 </div>
//                 <div className="historyContent">
//                   <img src="../assets/images/Budget_Item/Items/clothes.png" alt="clothes" />
//                   <span className="leftCategory">交通 高鐵</span>
//                   <span className="unpaid">未付 </span>
//                   <span className="rightMoney">$5000</span>
//                 </div>
//               </div>
//               <div className="dayHistory">
//                 <span className="historyDate">2024/12/12</span>
//                 <div className="historyContent">
//                   <img src="../assets/images/Budget_Item/Items/clothes.png" alt="clothes" />
//                   <span className="leftCategory">住宿 飯店</span>
//                   <span className="unpaid">未付 </span>
//                   <span className="rightMoney">$5000</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3 col-4 p-0 allcolume">
//             <div className="text-white rightbarDiv">
//               <div className="ringProtect">
//                 <div className="circle-ring">
//                   <span>NT $1500</span>
//                   <span>Total cost</span>
//                 </div>
//                 <div className="paid">
//                   <div>
//                     <span>未付金額</span>
//                     <br />
//                     <span>NT$1500</span>
//                   </div>
//                   <div>
//                     <span>已付金額</span>
//                     <br />
//                     <span>NT$1500</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="categoryDiv">
//                 <div className="categoryHistory">
//                   <img src="../assets/images/Budget_Item/Items/clothes.png" alt="clothes" />
//                   <span>住宿</span>
//                   <span className="Money">NT$ 5000</span>
//                 </div>
//                 <div className="categoryHistory">
//                   <img src="../assets/images/Budget_Item/Items/clothes.png" alt="clothes" />
//                   <span>食物</span>
//                   <span className="Money">NT$ 5000</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BudgetPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../../components/layout/Aside';
import BudgetHistory from '../BudgetPage/components/BudgetHistory';
import TotalAndCategorySummary from '../BudgetPage/components/TotalAndCategorySummary';

const logoMapping = {
  交通: '/images/budgetAnditem/budget/commute.png',
  住宿: '/images/budgetAnditem/budget/rest.png',
  飲食: '/images/budgetAnditem/budget/food.png',
  活動: '/images/budgetAnditem/budget/activity_ticket.png',
  娛樂: '/images/budgetAnditem/budget/entertainment.png',
  購物: '/images/budgetAnditem/budget/shopping.png',
  保險: '/images/budgetAnditem/budget/insurance.png',
  行李: '/images/budgetAnditem/budget/travel_luggage_and_bags.png',
  小費: '/images/budgetAnditem/budget/tips.png',
  健康: '/images/budgetAnditem/budget/medication_liquid.png',
  雜項: '/images/budgetAnditem/budget/unexpectable.png',
  回程: '/images/budgetAnditem/budget/back_home.png',
  其他: '/images/budgetAnditem/budget/others.png',
};

const BudgetPage = () => {
  const navigate = useNavigate();
  const currentScheduleId = localStorage.getItem("scheduleId");

  const handleEdit = (item) => {
    localStorage.setItem("UserChooseDiv", JSON.stringify(item));
    navigate('/popupbudget');
  };

  return (
    <div className="BudegetPage">
      <div className="container-fluid">
        <div className="row d-flex">
          <div className="col-md-1 col-2 p-0 allcolume">
            <div className="leftbarDiv">
              <Aside />
            </div>
          </div>
          <div className="col-md-8 col-6 p-0 allcolume">
            <div className="text-white mtopDiv">
              <div className="circle-background"></div>
              <span id="budgetTitle">預算清單</span>
              <a href="./editPlan.html">返回編輯計畫</a>
              <button
                className="increaseBtn"
                onClick={() => navigate('/popupbudget')}
              >
                增加+
              </button>
            </div>
            <BudgetHistory
              currentScheduleId={currentScheduleId}
              logoMapping={logoMapping}
              onEdit={handleEdit}
            />
          </div>
          <div className="col-md-3 col-4 p-0 allcolume">
            <div className="text-white rightbarDiv">
              <TotalAndCategorySummary
                currentScheduleId={currentScheduleId}
                logoMapping={logoMapping}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
