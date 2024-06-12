import { Trash } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../redux/slices/slice";

const CategoryList = ({ data }) => {
  const dispatch = useDispatch();

  const handleDeletecategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="category-list relative">
      <h1 className="emoji">{data.icon}</h1>
      <p>{data.name}</p>
      <button
        aria-label="delete category"
        onClick={() => handleDeletecategory(data.id)}
      >
        <Trash className="category-list-trash" />
      </button>
    </div>
  );
};

export default CategoryList;
