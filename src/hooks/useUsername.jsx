import React, { useEffect, useState } from "react";

export const useUsername = () => {
  const [userData, setUserData] = useState(null);
  const [usernames, setUsernames] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = localStorage.getItem("username");
    if (token) {
      setUserData(token.email);
      setUsernames(token.name);
    } else if (username) {
      setUserData(username);
      setUsernames(username);
    }
  }, []);

  return { userData, usernames };
};
