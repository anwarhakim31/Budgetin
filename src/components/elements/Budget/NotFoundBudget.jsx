import React from "react";
import { useDarkMode } from "../../../context/Darkmode";

export const NotFoundBudget = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="not-budget-wrapper relative">
      <div className="budget-notfound">
        <h3 className={isDark ? "text-light2" : ""}>Budget Not Available.</h3>
        <p>Please Add Some Budget.</p>
      </div>
    </div>
  );
};
