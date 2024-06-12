import React from "react";
import { useDarkMode } from "../../../context/Darkmode";

const Input = (props) => {
  const { name, type, id, placeholder, value, handleInputChange } = props;
  const { isDark } = useDarkMode();

  return (
    <input
      type={type}
      value={value}
      className={`${
        id === "password" ? "inputPass" : ""
      } input-auth relative inputs ${
        isDark ? "bg-primary-700 text-neutral-100" : ""
      }`}
      id={id}
      placeholder={placeholder}
      name={id}
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default Input;
