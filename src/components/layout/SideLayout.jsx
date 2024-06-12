import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FolderKanban } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useDarkMode } from "../../context/Darkmode";

const SideLayout = ({ isSidebar, setIsSideBar }) => {
  const { isDark } = useDarkMode();
  const sidebarRef = useRef();

  const handleClickoutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBar(false);
    }
  };

  const handleCloseSide = () => {
    setIsSideBar(false);
  };

  useEffect(() => {
    if (isSidebar) {
      document.addEventListener("click", handleClickoutside);
    } else {
      document.removeEventListener("click", handleClickoutside);
    }

    return () => document.removeEventListener("click", handleClickoutside);
  }, [isSidebar]);

  return (
    <aside
      className={`sidebar  ${isDark ? "bg-dark" : ""} ${
        isSidebar ? "sidebarActive" : ""
      } relative`}
      ref={sidebarRef}
    >
      <div className="p-4 w-full">
        <h2 className="fw-semibold logo text-accent-700 mb-4 text-center">
          Budgetin.
        </h2>
        <nav className="primary-navigation">
          <ul className="primary-list">
            <li className="list">
              <NavLink
                to={"/dashboard"}
                className={`${isDark ? "text-light" : ""}`}
              >
                <div className="icon">
                  <LayoutDashboard width={20} height={20} />
                </div>
                Dashboard
              </NavLink>
            </li>
            <li className="list">
              <NavLink
                to={"/transaction"}
                className={`${isDark ? "text-light" : ""}`}
              >
                <ArrowLeftRight width={20} height={20} className="icon" />
                Transaction
              </NavLink>
            </li>
            <li className="list">
              <NavLink
                to={"/manage"}
                className={`${isDark ? "text-light" : ""}`}
              >
                <FolderKanban width={20} height={20} className="icon " />
                Manage
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <small className="text-center fw-semibold  copy">
        Copyright &copy; 2024{" "}
        <span className="text-accent-700">Budgetin. </span>
        Made with <span className="text-accent-600 ">❤</span> by{" "}
        <Link
          to={"https://github.com/anwarhakim31"}
          className="text-accent-700"
          target="__blank"
        >
          Anwar Hakim
        </Link>
      </small>
      <button
        className="sidebar-close"
        aria-label="button close sidebar"
        onClick={handleCloseSide}
      >
        {" "}
        <X width={20} height={20} />{" "}
      </button>
    </aside>
  );
};

export default SideLayout;
