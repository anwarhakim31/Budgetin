import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useUsername } from "../../../hooks/useUsername";
import { useDarkMode } from "../../../context/Darkmode";
import budgetLogo from "../../../assets/images/budget.png";
import { useSelector } from "react-redux";
import {
  selectedDataBudget,
  selectedEndingBalance,
  selectedTotalExpense,
  selectedTotalIncome,
} from "../../../redux/slices/slice";
import { NotFoundBudget } from "../../elements/Budget/NotFoundBudget";
import BudgetList from "../../elements/Budget/BudgetList";
import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { Wallet } from "lucide-react";
import { formartCurrency } from "../../../constant/constant";

export const DashboardFragment = ({ handleOpenIncome, handleOpenExpense }) => {
  const { usernames } = useUsername();
  const { isDark } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const dataBudget = useSelector(selectedDataBudget);
  const totalIncome = useSelector(selectedTotalIncome);
  const totalExpense = useSelector(selectedTotalExpense);
  const balanceEnding = useSelector(selectedEndingBalance);

  const [animatedIncome, setAnimatedIncome] = useState(0);
  const [animatedExpense, setAnimatedExpense] = useState(0);
  const [animatedEndingBalance, setAnimatedEndingBalance] = useState(0);

  const [lastAnimatedIncome, setLastAnimatedIncome] = useState(0);
  const [lastAnimatedExpense, setLastAnimatedExpense] = useState(0);
  const [lastAnimatedEndingBalance, setLastAnimatedEndingBalance] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let start = null;
    const duration = 1000; // Duration of the animation in milliseconds

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const easeOutQuad = (t) => t * (2 - t); // Ease out function for smoother animation

      const differenceIncome = totalIncome - lastAnimatedIncome;
      setAnimatedIncome(
        lastAnimatedIncome + differenceIncome * easeOutQuad(progress / duration)
      );

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setLastAnimatedIncome(totalIncome);
        setAnimatedIncome(totalIncome);
      }
    };

    if (!loading) {
      requestAnimationFrame(animate);
    }
  }, [totalIncome, loading]);

  useEffect(() => {
    let start = null;
    const duration = 1000; // Duration of the animation in milliseconds

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const easeOutQuad = (t) => t * (2 - t); // Ease out function for smoother animation

      const differenceExpense = totalExpense - lastAnimatedExpense;
      setAnimatedExpense(
        lastAnimatedExpense +
          differenceExpense * easeOutQuad(progress / duration)
      );

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setLastAnimatedExpense(totalExpense);
        setAnimatedExpense(totalExpense);
      }
    };

    if (!loading) {
      requestAnimationFrame(animate);
    }
  }, [totalExpense, loading]);

  useEffect(() => {
    let start = null;
    const duration = 1000; // Duration of the animation in milliseconds

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const easeOutQuad = (t) => t * (2 - t); // Ease out function for smoother animation

      const differenceEndingBalance = balanceEnding - lastAnimatedEndingBalance;
      setAnimatedEndingBalance(
        lastAnimatedEndingBalance +
          differenceEndingBalance * easeOutQuad(progress / duration)
      );

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setLastAnimatedEndingBalance(balanceEnding);
        setAnimatedEndingBalance(balanceEnding);
      }
    };

    if (!loading) {
      requestAnimationFrame(animate);
    }
  }, [balanceEnding, loading]);

  return (
    <>
      <div className="dashboard-overflow">
        <div className="dashboard-main-header">
          <div>
            <h1 className="heading-100 font-bold username">
              Hallo,{" "}
              {usernames ? (
                usernames
              ) : (
                <span className="fw-semibold logo text-accent-700 mb-4 text-center">
                  Budgetin.
                </span>
              )}
              ! 👋
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
            <button
              className="pemasukan flex-center mr-3"
              aria-label="expense"
              onClick={handleOpenExpense}
            >
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
            {loading ? (
              <>
                <div
                  className={`${isDark ? "bg-dark" : ""} box-skeleton p-3 gap`}
                >
                  {" "}
                  <div className="child-box-skeleton skeleton"></div>
                  <div>
                    <div className="heading-skeleton skeleton"></div>
                    <div className="sub-skeleton skeleton"></div>
                  </div>
                </div>
                <div
                  className={`${isDark ? "bg-dark" : ""} box-skeleton p-3 gap`}
                >
                  {" "}
                  <div className="child-box-skeleton skeleton"></div>
                  <div>
                    <div className="heading-skeleton skeleton"></div>
                    <div className="sub-skeleton skeleton"></div>
                  </div>
                </div>
                <div
                  className={`${isDark ? "bg-dark" : ""} box-skeleton p-3 gap`}
                >
                  {" "}
                  <div className="child-box-skeleton skeleton"></div>
                  <div>
                    <div className="heading-skeleton skeleton"></div>
                    <div className="sub-skeleton skeleton"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="box box-income gap p-3">
                  <div className="box-image">
                    <TrendingUp />
                  </div>
                  <div>
                    <span className="fw-medium fs-3 text-primary-500">
                      Income
                    </span>
                    <h1
                      className={`${
                        isDark ? "text-white" : "text-primary-600"
                      } fw-medium  `}
                    >
                      {formartCurrency(animatedIncome)}
                    </h1>
                  </div>
                </div>
                <div className="box box-expense gap p-3">
                  <div className="box-image">
                    <TrendingDown />
                  </div>
                  <div>
                    <span className="fw-medium fs-3 text-primary-500">
                      Expense
                    </span>
                    <h1
                      className={`${
                        isDark ? "text-white" : "text-primary-600"
                      } fw-medium  `}
                    >
                      {formartCurrency(animatedExpense)}
                    </h1>
                  </div>
                </div>
                <div className="box ending-balance gap p-3">
                  <div className="box-image">
                    <Wallet />
                  </div>
                  <div>
                    <span className="fw-medium fs-3 text-primary-500">
                      Ending Balance
                    </span>
                    <h1
                      className={`${
                        isDark ? "text-white" : "text-primary-600"
                      } fw-medium  `}
                    >
                      {formartCurrency(animatedEndingBalance)}
                    </h1>
                  </div>
                </div>
              </>
            )}
          </div>
          {loading ? (
            <div
              className={`${
                isDark ? "bg-dark" : ""
              } dashboard-progress-skeleton `}
            >
              <div className="progress-head-skeleton">
                <div className="flex-center gap">
                  <div className="icon-head-skeleton skeleton"></div>
                  <h1 className="heading-skeleton skeleton"></h1>
                </div>
              </div>
            </div>
          ) : (
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
              <div
                className={`${
                  dataBudget.length === 0 ? "not" : ""
                } progress-content`}
              >
                {dataBudget.length === 0 ? (
                  <NotFoundBudget />
                ) : (
                  dataBudget.map((data) => (
                    <BudgetList key={data.id} data={data} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
