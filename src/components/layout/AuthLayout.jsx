import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useDarkMode } from "../../context/Darkmode";

const AuthLayout = ({ children }) => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = localStorage.getItem("username");

    if (token || username) {
      navigate("/dashboard");
    }
  }, []);

  const handleToRegister = () => {
    navigate("/register");
  };

  const regis = pathname === "/register";

  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {" "}
      <div className={`${isDark ? "bg-dark2" : ""}`}>
        <div className={`authlayout `}>
          <div className={`${isDark ? "bg-dark" : ""} auth p-5`}>
            <h2 className="fw-semibold  text-accent-700">Budgetin.</h2>
            <h5
              className={`${regis ? "mb-5" : ""} ${
                isDark ? "text-light" : ""
              } my-4 text-primary-700 fw-regular fs-2`}
            >
              {regis
                ? "Please Insert Your Details."
                : "You can login with your registered account or quick login with your Google account."}
            </h5>

            {children}
            {regis && (
              <p
                className={`authnavigation  fs-1 fw-medium mt-3 p-3 w-full bg-primary-100 text-center ${
                  isDark ? "bg-dark" : ""
                }`}
              >
                Have an account?{" "}
                <Link
                  className="text-accent-700 fw-bold"
                  onClick={handleToLogin}
                >
                  Login
                </Link>
              </p>
            )}
            {!regis && (
              <p
                className={`authnavigation fs-1 fw-medium mt-3 p-3 w-full bg-primary-100 text-center ${
                  isDark ? "bg-dark " : ""
                }`}
              >
                Don't have an account?{" "}
                <Link
                  className="text-accent-700 fw-bold"
                  onClick={handleToRegister}
                >
                  Register
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
