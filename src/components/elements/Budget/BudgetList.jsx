import React, { useEffect, useMemo, useState } from "react";
import { formartCurrency } from "../../../constant/constant";

const BudgetList = ({ data }) => {
  const [background, setBackground] = useState("FFFFFF");
  const remaining = useMemo(
    () => (!data.expense ? data.income : data.income - data.expense),
    [(data.income, data.expense)]
  );

  const spend = useMemo(
    () => (!data.expense ? 0 : data.expense),
    [data.income, data.expense]
  );

  const spendPercentage = useMemo(() => {
    if (!data.income) return 0;
    return Math.min((spend / data.income) * 100, 100);
  }, [spend, data.income]);

  useEffect(() => {
    if (spendPercentage > 90) {
      setBackground("F6EEEE");
    } else {
      setBackground("FFFFFF");
    }
  }, [spendPercentage]);

  const getRandomBrightColor = () => {
    const colors = [
      "#fe2712",
      "#fd9a01",
      "#d1ea2c",
      "#07a1ad",
      "#ab2270",
      "f96132",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const progressBarColor = useMemo(getRandomBrightColor, [spendPercentage]);

  return (
    <div className="budget-list " style={{ backgroundColor: background }}>
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
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${spendPercentage}%`,
            backgroundColor: progressBarColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetList;
