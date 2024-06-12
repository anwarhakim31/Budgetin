import React, { useEffect, useState } from "react";

export const useUsername = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = localStorage.getItem("username");
    if (token) {
      setUserData(token.email);
    } else if (username) {
      setUserData(username);
    }
  }, []);

  return userData;
};
