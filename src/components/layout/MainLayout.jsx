import { Outlet, useLocation } from "react-router-dom";
import { DashboardFragment } from "../fragments/DashboardFragment";
import { ManageFragment } from "../fragments/ManageFragment";

const MainLayout = () => {
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
          {/* {pathname === "/dashboard" && <DashboardFragment />}
          {pathname === "/manage" && <ManageFragment />} */}
          <Outlet />
          {/* nested router */}
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
