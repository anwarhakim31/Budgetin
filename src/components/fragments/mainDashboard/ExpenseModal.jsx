import React, { useEffect, useRef, useState } from "react";
import Modal2 from "../../elements/Modal2";
import { ChevronUp, Plus, SearchIcon, X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  addIncome,
  selectedDataBudget,
  selectedDataCategory,
} from "../../../redux/slices/slice";

import { v4 as uuid } from "uuid";
import { useUsername } from "../../../hooks/useUsername";

const ExpenseModal = ({ onClose }) => {
  const [isDrop, setIsDrop] = useState(false);

  const [categorySearch, setCategorySearch] = useState([]);
  const [isDecription, setIsDecription] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [dataCategory, setDataCategory] = useState([]);
  const [isEmoji, setIsEmoji] = useState({ name: "", icon: "" });
  const totalExpenseRef = useRef(null);
  const dataBudget = useSelector(selectedDataBudget);
  const categoryRef = useRef(null);
  const { userData } = useUsername();

  const dispatch = useDispatch();
  const time = Date.now();

  useEffect(() => {
    const category = dataBudget.map((data) => data.category);

    setDataCategory(category);
  }, [dataBudget]);

  const handleChooseCategory = () => {
    setIsDrop(!isDrop);
  };

  const handleSearchCategory = (e) => {
    const newdata = dataCategory.filter((data) =>
      data.name.includes(e.target.value.toLowerCase().trim())
    );
    setCategorySearch(newdata);
  };

  const handleChangeDecription = (e) => {
    setIsDecription(e.target.value);
  };

  const handleTotalExpense = (e) => {
    setTotalExpense(e.target.value);
  };

  const handleSelectEmoji = (name, icon) => {
    setIsEmoji({ name, icon });
    setIsDrop(!isDrop);
  };

  useEffect(() => {
    setCategorySearch(dataCategory);
  }, [dataCategory]);

  const handleSubmit = () => {
    if (totalExpense === 0) {
      return totalExpenseRef.current.focus();
    } else if (isEmoji.name === "") {
      return categoryRef.current.focus();
    }

    dispatch(
      addExpense({
        user: userData,
        id: uuid(),
        expense: +totalExpense,
        category: isEmoji,
        amount: totalExpense,
        description: isDecription,
        date: time,
      })
    );
    onClose();
  };

  return (
    <Modal2 onClose={onClose}>
      <div className="flex-between">
        <h3 className="fs-3 fw-semibold text-primary-700">
          Create a new <span className="text-accent-600">expense</span>{" "}
          transaction
        </h3>
        <button
          className="close-modal"
          aria-label="back to section"
          onClick={onClose}
        >
          <X height={15} width={15} className="text-primary-700" />
        </button>
      </div>
      <div className="modal-content-wrapper mt-5">
        <div className="modal-content">
          {" "}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="fw-semibold fs-2 text-primary-900"
            >
              Description
            </label>
            <input
              type="text"
              className="inputs"
              onChange={handleChangeDecription}
              value={isDecription}
            />
            <span className="fs-1">Transaction description (Opsional).</span>
          </div>
          <div className="flex flex-col mt-2">
            <label
              htmlFor="category"
              className="fw-semibold fs-2 text-primary-900"
            >
              Total Expense
            </label>
            <input
              type="number"
              className="inputs"
              onChange={handleTotalExpense}
              value={totalExpense}
              ref={totalExpenseRef}
              min="0"
              step="0.01"
            />
            <span className="fs-1">Transaction amount (Required)</span>
          </div>
          <div className="flex flex-col mt-2 choose">
            <label
              htmlFor="category"
              className="fw-semibold fs-2 text-primary-900"
            >
              Category
            </label>
            <button
              className="choose-category"
              aria-label="choose category"
              onClick={handleChooseCategory}
              ref={categoryRef}
            >
              <span className="text-primary-500">
                {" "}
                {!isEmoji.name
                  ? "Choose Category"
                  : `${isEmoji.icon} ${isEmoji.name}`}
              </span>
              {!isDrop ? (
                <ChevronDown
                  className="text-primary-500"
                  width={20}
                  height={20}
                />
              ) : (
                <ChevronUp
                  className="text-primary-500"
                  width={20}
                  height={20}
                />
              )}
            </button>

            {isDrop && (
              <div role="dialog" className="drop-down">
                <div className="relative drop-down-search">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Icon..."
                    className="drop-down-input"
                    onChange={handleSearchCategory}
                  />
                  {/* <button
                    className="plus button"
                    aria-label="add category "
                    title="Add Category"
                    // onClick={handleOpenCategory}
                  >
                    <Plus height={15} width={15} />
                  </button> */}
                </div>
                <div className="dialog-content">
                  {dataCategory.length === 0 ? (
                    <div className="x pt-3 px-4 w-full">
                      <span className="fs-1 text-center ">
                        Category Not Found
                      </span>
                    </div>
                  ) : (
                    [...categorySearch]
                      .sort((a, b) => b.name.localeCompare(a.name))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="child"
                          onClick={() =>
                            handleSelectEmoji(item.name, item.icon)
                          }
                        >
                          <h3>{item.icon}</h3>
                          <p className="fs-1">{item.name}</p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
            <div className="button-modal-Expense">
              <button
                type="button"
                aria-label="cancel add category"
                className="button bg-primary-400 fs-1"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                aria-label="add Category"
                className="button fs-1"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal2>
  );
};

export default ExpenseModal;
