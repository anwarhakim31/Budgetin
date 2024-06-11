import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useLoggedIn = () => {
  const [isToken, setIsToken] = useState(null);
  const [isUsername, setIsUsername] = useState(null);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = localStorage.getItem("username");
    if (token || username) {
      setIsToken(token);
      setIsUsername(username);
      navigate(pathname);
    } else {
      navigate("/login");
    }
  }, []);

  return { isToken, isUsername };
};
