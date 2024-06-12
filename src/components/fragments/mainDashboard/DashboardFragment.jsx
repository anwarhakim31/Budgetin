import React, { useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useUsername } from "../../../hooks/useUsername";
import { useDarkMode } from "../../../context/Darkmode";
import budgetLogo from "../../../assets/images/budget.png";

export const DashboardFragment = ({ handleOpenIncome }) => {
  const { usernames } = useUsername();
  const { isDark } = useDarkMode();

  return (
    <>
      <div className="dashboard-overflow">
        <div className="dashboard-main-header">
          <div>
            <h1 className="heading-100 font-bold username">
              Hallo, {usernames}! 👋
            </h1>
          </div>
          <div className="flex-center gap">
            <button
              className="pengeluaran flex-center"
              onClick={handleOpenIncome}
              aria-label="add income"
            >
              <Plus className="mr-1" width={20} height={20} />
              <p>
                {" "}
                Income <span className="ml-3">🤑</span>
              </p>
            </button>
            <button className="pemasukan flex-center mr-3">
              <Minus className="mr-1" width={20} height={20} />
              <p>
                {" "}
                Expense <span className="mr-2">😤</span>
              </p>
            </button>
          </div>
        </div>
        <div className="wrapper-dashboard">
          <div className="Overwiew">
            <h1
              className={`${
                isDark ? "text-light" : "text-primary-700"
              } heading-200 fw-semibold `}
            >
              Overview
            </h1>
          </div>
          <div className="financial-dashboard">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </div>
          <div className="dashboard-progress">
            <div className="head-progress gap">
              <img src={budgetLogo} alt="budget" className="icon-head" />
              <h1
                className={`${
                  isDark ? "text-light" : "text-primary-700"
                } heading-200 fw-semibold `}
              >
                Budgets
              </h1>
            </div>
            <div className="progress-content">
              <div className="not-budget-wrapper relative">
                <div className="budget-notfound">
                  <h3 className={isDark ? "text-light2" : ""}>
                    Budget Not Available.
                  </h3>
                  <p>Please Add Some Budget.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
