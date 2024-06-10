import React from "react";
import Label from "./Label";
import Input from "./Input";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
const InputForm = (props) => {
  const {
    name,
    id,
    placeholder,
    type,
    handleInputChange,
    value,
    error,
    handleSeePass,
    isEye,
  } = props;

  return (
    <div className="flex flex-col relative">
      <Label>{name}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        handleInputChange={handleInputChange}
        value={value}
        name={name}
      ></Input>
      {id === "password" &&
        (isEye ? (
          <EyeOff
            width={20}
            height={20}
            className={`eye text-primary-500`}
            onClick={handleSeePass}
          />
        ) : (
          <Eye
            width={20}
            height={20}
            className={`eye text-primary-500`}
            onClick={handleSeePass}
          />
        ))}
      <div className={`${!error ? "mt-5" : ""}`}>
        <small className={`text-accent-600 fw-medium fs-1`}>{error}</small>
      </div>
    </div>
  );
};

export default InputForm;
