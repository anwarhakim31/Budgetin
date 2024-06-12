import React, { useEffect, useState } from "react";
import { ListTodo } from "lucide-react";
import { v4 as uuid } from "uuid";
import Modal from "../elements/Modal";
import { useDarkMode } from "../../context/Darkmode";
import { useDispatch, useSelector } from "react-redux";
import {
  loaddedCategory,
  selectedDataCategory,
} from "../../redux/slices/slice";
import CatergoryNotFound from "../elements/category/CatergoryNotFound";
import CategoryList from "../elements/category/CategoryList";
import { useUsername } from "../../hooks/useUsername";

export const ManageFragment = ({ handleOpenCategory }) => {
  const { isDark } = useDarkMode();
  const dataCategory = useSelector(selectedDataCategory);
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const usernmae = useUsername();

  useEffect(() => {
    dispatch(loaddedCategory(usernmae));
  }, [usernmae]);

  useEffect(() => {
    setIsloading(true);

    const timeout = setTimeout(() => {
      setIsloading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  console.log(isloading);

  return (
    <>
      <div className="dashboard-main-header">
        <div>
          <h1 className="heading-100">Manage</h1>
          <p className="heading-50 text-head text-primary-500">
            Manage your account settings such create and delete categories.
          </p>
        </div>
      </div>
      {isloading ? (
        <div className="wrapper-category-skeleton">
          <div className="category-head-sekeleton">
            <div className="flex-center gap">
              <div className="icon-head-skeleton skeleton"></div>
              <h1 className="heading-skeleton skeleton"></h1>
            </div>
            <div className="button-skeleton skeleton"></div>
          </div>
        </div>
      ) : (
        <>
          <div className={`${isDark ? "bg-dark " : ""}wrapper-category`}>
            <div className="category-head">
              <div className="flex-center gap">
                <ListTodo className="icon-category-head" />
                <h1
                  className={`${
                    isDark ? "text-light" : "text-primary-700"
                  }heading-200 fw-semibold `}
                >
                  Category
                </h1>
              </div>
              <button
                className="button-category"
                aria-label="tambah kategori"
                onClick={handleOpenCategory}
              >
                {" "}
                Add Category
              </button>
            </div>
            <div className="category-content">
              {dataCategory.length === 0 ? (
                <CatergoryNotFound />
              ) : (
                dataCategory.map((data) => (
                  <CategoryList key={data.id} data={data} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
