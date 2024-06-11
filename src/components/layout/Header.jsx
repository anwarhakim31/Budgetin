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
                onError={(e) => e.target.src === userDefault}
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
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        setImage(token.picture || userDefault);
        setName(token.name || "User");
        setEmail(token.email || "");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <header className="p-3 header">
      <div className="header-wrapper">
        <button
          aria-label="toggle-sidebar"
          className={`${
            isDark ? "bg-dark darklight" : "darklight"
          } sidebar-toggle`}
          onClick={handleToggleSidebar}
        >
          <AlignLeft height={20} width={20} />
        </button>
        <div className="flex-center gap">
          <button
            className={isDark ? "bg-dark darklight" : "darklight"}
            aria-label="toggle dark/light"
            onClick={handleToggleIsDark}
            title="Light/Dark"
          >
            {!isDark ? (
              <Sun height={20} width={20} />
            ) : (
              <MoonStar height={20} width={20} />
            )}
          </button>
          <div></div>

          <div className="profile" onClick={handleTogglLogout} title="Profile">
            <img
              src={image}
              className="user-image"
              alt="user image"
              onError={(e) => e.target.src === userDefault}
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
