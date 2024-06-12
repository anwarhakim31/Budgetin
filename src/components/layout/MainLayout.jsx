import { Outlet, useLocation } from "react-router-dom";
import { DashboardFragment } from "../fragments/mainDashboard/DashboardFragment";
import { useEffect, useState } from "react";
import ManageModal from "../fragments/manage/ManageModal";
import { ManageFragment } from "../fragments/manage/ManageFragment";
import IncomeModal from "../fragments/mainDashboard/IncomeModal";
import { loaddedCategory } from "../../redux/slices/slice";
import { useUsername } from "../../hooks/useUsername";
import { useDispatch } from "react-redux";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [isCategory, setIsCategory] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const { userData } = useUsername();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loaddedCategory(userData));
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

  return (
    <main className="main h-full">
      <div className="container">
        <div className="dashboard-main">
          {pathname === "/dashboard" && (
            <DashboardFragment handleOpenIncome={handleOpenIncome} />
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
    </main>
  );
};

export default MainLayout;
