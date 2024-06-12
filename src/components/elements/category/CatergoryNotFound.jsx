import React from "react";
import { useDarkMode } from "../../../context/Darkmode";

const CatergoryNotFound = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="category-notfound">
      <h3 className={isDark ? "text-light2" : ""}>Tidak Ada kategori.</h3>
      <p>Silahkan tambahkan kategori baru.</p>
    </div>
  );
};

export default CatergoryNotFound;
