import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetHistory = ({ currentScheduleId, logoMapping, onEdit }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/budget/UserBudget/${currentScheduleId}`)
      .then((response) => {
        const budgetItems = Array.isArray(response.data) ? response.data : [response.data];
        setHistory(budgetItems[0].UserBudget);
      })
      .catch((error) => {
        console.error("獲取歷史記錄失敗:", error);
      });
  }, [currentScheduleId]);

  const groupedByDate = history.reduce((acc, item) => {
    const date = new Date(item.BudgetDate).toLocaleDateString('zh-TW');
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="historyDiv">
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date} className="dayHistory">
          <span className="historyDate">{date}</span>
          {items.map((item) => (
            <div
              key={item.Budget_id}
              className="historyContent"
              onClick={() => onEdit(item)}
            >
              <img src={logoMapping[item.BudgetName]} alt={item.BudgetName} />
              <span className="leftCategory">
                {item.BudgetName} {item.BudgetDetails}
              </span>
              <span className="unpaid">{item.PaidStatus === 0 ? '未付' : ''}</span>
              <span className="rightMoney">{item.Cost}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BudgetHistory;
