import React, { forwardRef } from "react";

const FilterType = forwardRef(
  (
    {
      selectType,
      handleChangeType,
      setSelectType,
      handleToggleType,
      selectCategory,
    },
    ref
  ) => {
    return (
      <div
        className={`${selectType ? "" : "active"} ${
          selectCategory ? "active-right" : ""
        } popup-navigation`}
        ref={ref}
      >
        <div className="select">
          <input
            type="radio"
            value="income"
            id="income"
            checked={selectType === "income"}
            onChange={handleChangeType}
          />
          <label htmlFor="income">Income</label>
        </div>
        <div className="select">
          <input
            type="radio"
            value="expense"
            id="expense"
            checked={selectType === "expense"}
            onChange={handleChangeType}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        {selectType && (
          <div
            className="clear"
            onClick={() => {
              setSelectType("");
              handleToggleType();
            }}
          >
            <span>Clear Filter</span>
          </div>
        )}
      </div>
    );
  }
);

FilterType.displayName = "FilterType";

export default FilterType;
