import React from "react";
import { useLoggedIn } from "../hooks/useLoggedIn";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { isToken, isUsername } = useLoggedIn();

  return <div>MainPage</div>;
};

export default MainPage;
