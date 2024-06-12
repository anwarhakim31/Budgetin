import React from "react";
import { useDarkMode } from "../../../context/Darkmode";

const CatergoryNotFound = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="category-notfound">
      <h3 className={isDark ? "text-light2" : ""}>Category Notfound.</h3>
      <p>Please Add New Category.</p>
    </div>
  );
};

export default CatergoryNotFound;
