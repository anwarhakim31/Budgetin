import React from "react";

const Input = (props) => {
  const { name, type, id, placeholder, value, handleInputChange } = props;

  return (
    <input
      type={type}
      value={value}
      className="input-auth"
      id={id}
      placeholder={placeholder}
      name={name}
      onChange={(e) => handleInputChange(e)}
    ></input>
  );
};

export default Input;
