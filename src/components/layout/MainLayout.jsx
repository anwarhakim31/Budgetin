import { Outlet, useLocation } from "react-router-dom";
import { DashboardFragment } from "../fragments/mainDashboard/DashboardFragment";
import { useEffect, useState } from "react";
import ManageModal from "../fragments/manage/ManageModal";
import { ManageFragment } from "../fragments/manage/ManageFragment";
import IncomeModal from "../fragments/mainDashboard/IncomeModal";
import { loaddedBudget, loaddedCategory } from "../../redux/slices/slice";
import { useUsername } from "../../hooks/useUsername";
import { useDispatch } from "react-redux";
import ExpenseModal from "../fragments/mainDashboard/ExpenseModal";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [isCategory, setIsCategory] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const { userData } = useUsername();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loaddedCategory(userData));
  }, [userData]);

  useEffect(() => {
    dispatch(loaddedBudget(userData));
  }, [userData]);

  const handleOpenCategory = () => {
    setIsCategory(true);
  };

  const handleCloseCategory = () => {
    setIsCategory(false);
  };

  const handleOpenIncome = () => {
    setIsIncome(true);
  };

  const handleCloseIncome = () => {
    setIsIncome(false);
  };

  const handleOpenExpense = () => {
    setIsExpense(true);
  };

  const handleCloseExpense = () => {
    setIsExpense(false);
  };

  return (
    <main className="main h-full">
      <div className="container">
        <div className="dashboard-main">
          {pathname === "/dashboard" && (
            <DashboardFragment
              handleOpenIncome={handleOpenIncome}
              handleOpenExpense={handleOpenExpense}
            />
          )}
          {pathname === "/manage" && (
            <ManageFragment handleOpenCategory={handleOpenCategory} />
          )}
        </div>
      </div>
      {isCategory && <ManageModal onClose={handleCloseCategory} />}
      {isIncome && (
        <IncomeModal
          onClose={handleCloseIncome}
          handleOpenCategory={handleOpenCategory}
        />
      )}
      {isExpense && <ExpenseModal onClose={handleCloseExpense} />}
    </main>
  );
};

export default MainLayout;
