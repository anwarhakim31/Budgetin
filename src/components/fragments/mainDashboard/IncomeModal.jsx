import React, { useEffect, useRef, useState } from "react";

import { ChevronUp, Plus, SearchIcon, X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Modal2 from "../../elements/Modal2";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  selectedDataBudget,
  selectedDataCategory,
} from "../../../redux/slices/slice";
import { useUsername } from "../../../hooks/useUsername";
import { v4 as uuid } from "uuid";

const IncomeModal = ({ onClose, handleOpenCategory }) => {
  const [isDrop, setIsDrop] = useState(false);
  const dataCategory = useSelector(selectedDataCategory);
  const [categorySearch, setCategorySearch] = useState([]);
  const [isDecription, setIsDecription] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [isEmoji, setIsEmoji] = useState({ name: "", icon: "" });
  const totalIncomeRef = useRef(null);
  const categoryRef = useRef(null);
  const { userData } = useUsername();

  const dispatch = useDispatch();
  const time = Date.now();

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

  const handleTotalInCome = (e) => {
    setTotalIncome(e.target.value);
  };

  const handleSelectEmoji = (name, icon) => {
    setIsEmoji({ name, icon });
    setIsDrop(!isDrop);
  };

  useEffect(() => {
    setCategorySearch(dataCategory);
  }, [dataCategory]);

  const handleSubmit = () => {
    if (totalIncome === 0) {
      return totalIncomeRef.current.focus();
    } else if (isEmoji.name === "") {
      return categoryRef.current.focus();
    }

    dispatch(
      addIncome({
        user: userData,
        id: uuid(),
        income: parseFloat(totalIncome),
        expense: 0,
        category: isEmoji,
        amount: +totalIncome,
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
          Create a new <span className="text-accent-500">income</span>{" "}
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
            <span className="fs-1">Transaction Description (Opsional).</span>
          </div>
          <div className="flex flex-col mt-2">
            <label
              htmlFor="category"
              className="fw-semibold fs-2 text-primary-900"
            >
              Amount
            </label>
            <input
              type="number"
              className="inputs"
              onChange={handleTotalInCome}
              value={totalIncome}
              ref={totalIncomeRef}
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
                  <button
                    className="plus button"
                    aria-label="add category "
                    title="Add Category"
                    onClick={handleOpenCategory}
                  >
                    <Plus height={15} width={15} />
                  </button>
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
            <div className="button-modal-income">
              <button
                type="button"
                aria-label="cancel add category"
                className="button bg-primary-400 fs-1"
                onClick={onClose}
              >
                cancel
              </button>
              <button
                type="submit"
                aria-label="add Category"
                className="button fs-1"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal2>
  );
};

export default IncomeModal;
