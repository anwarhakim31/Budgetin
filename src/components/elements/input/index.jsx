import React from "react";
import Label from "./Label";
import Input from "./Input";

const InputForm = (props) => {
  const { name, id, placeholder, type, handleInputChange, value } = props;

  return (
    <div className="flex flex-col">
      <Label>{name}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        handleInputChange={handleInputChange}
        value={value}
        name={name}
      ></Input>
    </div>
  );
};

export default InputForm;
