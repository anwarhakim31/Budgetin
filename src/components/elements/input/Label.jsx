import React from "react";

const Label = ({ children, id }) => {
  return (
    <label htmlFor={id} className="label-auth fw-medium">
      {children}
    </label>
  );
};

export default Label;
