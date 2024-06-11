import React, { forwardRef, useEffect, useRef, useState } from "react";
import userDefault from "../../assets/images/user.png";
import { Axis3D } from "lucide-react";
import axios from "axios";
import { Sun } from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/Darkmode";
import { MoonStar } from "lucide-react";
import { AlignLeft } from "lucide-react";

const Logout = forwardRef(
  ({ image, isLogout, handleLogout, name, email }, ref) => {
    const [isOpen, setisOpen] = useState(false);
    const { isDark } = useDarkMode();

    useEffect(() => {
      const timeout = setTimeout(() => {
        setisOpen(isLogout);
      }, 10);

      return () => clearTimeout(timeout);
    }, [isLogout]);

    return (
      <div
        role="dialog"
        className={`${isOpen ? "hidden" : "show"}  logout`}
        ref={ref}
      >
        <div className="flex-between log-list">
          <div>
            <div className="profile">
              <img
                src={image}
                className="user-image"
                alt="user image"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full ">
            <h3 className="fs-2 username fw-bold text-primary-700">{name}</h3>
            <h4 className="fs-1 email fw-semibold text-primary-500">{email}</h4>
          </div>
        </div>
        <div className="flex-between log-list" onClick={handleLogout}>
          <div className="flex-center">
            <LogOut width={20} height={20} />
          </div>
          <div className="w-full">
            <h3 className="fs-2 fw-semibold text-primary-700">Logout</h3>
          </div>
        </div>
        <h2 className="log-logo fw-semibold fs-2  text-accent-700">
          Budgetin.
        </h2>
      </div>
    );
  }
);

Logout.displayName = "logOut";

const Header = ({ isToken, isUsername, handleToggleSidebar }) => {
  const [image, setImage] = useState(userDefault);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const { handleToggleIsDark, isDark } = useDarkMode();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsLogout(false);
      }
    };

    if (isLogout) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLogout]);

  const handleTogglLogout = (e) => {
    setIsLogout(!isLogout);
    e.stopPropagation();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  useEffect(() => {
    isToken ? setImage(isToken.picture) : setImage(userDefault);
    isToken ? setName(isToken.name) : setName(isUsername);
    isToken ? setEmail(isToken.email) : setEmail("");
  }, [isToken, isUsername, image]);

  return (
    <header className="p-4 header">
      <div className="header-wrapper">
        <button
          aria-label="toggle-sidebar"
          className={`${
            isDark ? "bg-dark darklight" : "darklight"
          } sidebar-toggle`}
          onClick={handleToggleSidebar}
        >
          <AlignLeft />
        </button>
        <div className="flex-between gap">
          <button
            className={isDark ? "bg-dark darklight" : "darklight"}
            aria-label="toggle dark/light"
            onClick={handleToggleIsDark}
            title="Light/Dark"
          >
            {!isDark ? <Sun /> : <MoonStar />}
          </button>
          <div></div>

          <div className="profile" onClick={handleTogglLogout} title="Profile">
            <img
              src={image}
              className="user-image"
              alt="user image"
              loading="lazy"
            />
          </div>
          {isLogout && (
            <Logout
              ref={modalRef}
              image={image}
              isLogout={isLogout}
              handleLogout={handleLogout}
              name={name}
              email={email}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
