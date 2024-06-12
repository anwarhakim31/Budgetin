import React, { useRef, useState } from "react";
import { useLoggedIn } from "../hooks/useLoggedIn";
import { useNavigate } from "react-router-dom";
import SideLayout from "../components/layout/SideLayout";
import Header from "../components/layout/Header";
import MainLayout from "../components/layout/MainLayout";
import { useDarkMode } from "../context/Darkmode";

const HomePage = () => {
  const { isToken, isUsername } = useLoggedIn();
  const { isDark } = useDarkMode();
  const [isSidebar, setIsSideBar] = useState(false);

  const handleToggleSidebar = (e) => {
    setIsSideBar((prevState) => !prevState);
    e.stopPropagation();
  };

  return (
    <section id="dashboard" className="">
      <Header
        isToken={isToken}
        isUsername={isUsername}
        handleToggleSidebar={handleToggleSidebar}
      />
      <div
        className={`${isDark ? " bg-dark2 " : ""}dashboard-wrapper h-screen`}
      >
        <SideLayout isSidebar={isSidebar} setIsSideBar={setIsSideBar} />
        <MainLayout isToken={isToken} isUsername={isUsername} />
      </div>
    </section>
  );
};

export default HomePage;
