import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalAndCategorySummary = ({ currentScheduleId, logoMapping }) => {
  const [totals, setTotals] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/budget/UserBudget/${currentScheduleId}`)
      .then((response) => {
        const data = response.data[0];
        setTotals(data.TotalAndifPaid[0]);
        setCategories(data.CategoryCost);
        // console.log(setTotals, setCategories)
      })
      .catch((error) => {
        console.error("獲取總金額和分類失敗:", error);
      });
  }, [currentScheduleId]);

  return (
    <div className="rightbarDiv">
      {/* 總金額和已付/未付 */}
      <div className="ringProtect">
        <div className="circle-ring">
          <span>NT ${totals.TotalCost}</span>
          <span>Total Cost</span>
        </div>
        <div className="paid">
          <div>
            <span>未付金額</span>
            <br />
            <span>NT${totals.TotalUnpaid}</span>
          </div>
          <div>
            <span>已付金額</span>
            <br />
            <span>NT${totals.TotalPaid}</span>
          </div>
        </div>
      </div>
      {/* 分類金額 */}
      <div className="categoryDiv">
        {categories.map((category) => (
          <div key={category.BudgetName} className="categoryHistory">
            <img src={logoMapping[category.BudgetName]} alt={category.BudgetName} />
            <span>{category.BudgetName}</span>
            <span className="Money">NT$ {category.TotalByBudgetName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalAndCategorySummary;
