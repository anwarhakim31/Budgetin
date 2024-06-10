import React from "react";

const Input = (props) => {
  const { name, type, id, placeholder, value, handleInputChange } = props;

  return (
    <input
      type={type}
      value={value}
      className={`${id === "password" ? "inputPass" : ""} input-auth relative `}
      id={id}
      placeholder={placeholder}
      name={id}
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default Input;
