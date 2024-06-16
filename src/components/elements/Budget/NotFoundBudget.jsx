import React from "react";
import { useDarkMode } from "../../../context/Darkmode";

export const NotFoundBudget = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="not-budget-wrapper">
      <div className="budget-notfound">
        <h3 className={isDark ? "text-light2" : ""}>Budget Not Available.</h3>
        <p>Please Create Income Transaction.</p>
      </div>
    </div>
  );
};
