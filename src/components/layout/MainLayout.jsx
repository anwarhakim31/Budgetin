import { Outlet, useLocation } from "react-router-dom";
import { DashboardFragment } from "../fragments/DashboardFragment";
import { ManageFragment } from "../fragments/ManageFragment";
import { useState } from "react";
import Modal from "../elements/Modal";
import ManageModal from "../fragments/manage/ManageModal";

const MainLayout = ({ isToken, isUsername }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenCategory = () => {
    setIsOpen(true);
  };

  const handleCloseCategory = () => {
    setIsOpen(false);
  };

  return (
    <main className="main h-full">
      <div className="container pt-9">
        <div className="dashboard-main">
          {pathname === "/dashboard" && <DashboardFragment />}
          {pathname === "/manage" && (
            <ManageFragment handleOpenCategory={handleOpenCategory} />
          )}
        </div>
      </div>
      {isOpen && (
        <ManageModal
          onClose={handleCloseCategory}
          isToken={isToken}
          isUsername={isUsername}
        />
      )}
    </main>
  );
};

export default MainLayout;
