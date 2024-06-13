import React from "react";

const BudgetList = ({ data }) => {
  return (
    <div className="budget-list">
      <div className="flex-between">
        <div className="flex-center gap">
          <p className="budget-list-icon">{data.category.icon}</p>
          <h4 className="budget-list-name">{data.category.name}</h4>
        </div>
        <h4 className="total-budget">{data.category.income}</h4>
      </div>
      <div className="flex-between mt-2">
        <p className="spent">10000 spent</p>
        <p className="remain">10000 remaining</p>
      </div>
      <div></div>
    </div>
  );
};

export default BudgetList;
