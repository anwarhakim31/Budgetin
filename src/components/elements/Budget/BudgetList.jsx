import React, { useMemo, useState } from "react";
import { formartCurrency } from "../../../constant/constant";

const BudgetList = ({ data }) => {
  const [isRemaning, setIsRemaining] = useState(0);

  const remaining = useMemo(
    () => (!data.expense ? data.income : data.income - data.expense),
    [(data.income, data.expense)]
  );

  const spend = useMemo(
    () => (!data.expense ? 0 : data.expense),
    [data.income, data.expense]
  );

  return (
    <div className="budget-list">
      <div className="flex-between">
        <div className="flex-center gap">
          <p className="budget-list-icon">{data.category.icon}</p>
          <h4 className="budget-list-name">{data.category.name}</h4>
        </div>
        <h4 className="total-budget">{formartCurrency(data.income)}</h4>
      </div>
      <div className="flex-between mt-2">
        <p className="spent">{formartCurrency(spend)} spend</p>
        <p className="remain">{formartCurrency(remaining)} remaining</p>
      </div>
    </div>
  );
};

export default BudgetList;
