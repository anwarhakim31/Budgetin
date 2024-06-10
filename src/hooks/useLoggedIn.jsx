import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoggedIn = () => {
  const [isToken, setIsToken] = useState(null);
  const [isUsername, setIsUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = localStorage.getItem("username");
    if (token || username) {
      setIsToken(token);
      setIsUsername(username);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return { isToken, isUsername };
};
