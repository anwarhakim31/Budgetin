import { createSlice } from "@reduxjs/toolkit";
import {
  SaveCategoryStorage,
  loadBudgetStorage,
  loadCategoryStorage,
  saveBudgetStorage,
} from "../../helper/storage";

const initialState = {
  category: [],
  budget: [],
  transaction: [],
};

const BudgetinSlice = createSlice({
  name: "budgetin",
  initialState,
  reducers: {
    loaddedCategory: (state, action) => {
      state.category = loadCategoryStorage(action.payload);
    },
    loaddedBudget: (state, action) => {
      state.budget = loadBudgetStorage(action.payload);
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
      SaveCategoryStorage(state.category);
    },
    deleteCategory: (state, action) => {
      state.category = state.category.filter(
        (item) => item.id !== action.payload
      );
      SaveCategoryStorage(state.category);
    },
    addIncome: (state, action) => {
      const { user, id, income, category } = action.payload;

      const selectIndex = state.budget.findIndex(
        (item) => item.category.name === category.name
      );

      if (selectIndex !== -1) {
        state.budget[selectIndex].income += income;
      } else {
        state.budget.push({ user, id, income, category });
      }
      state.transaction.push({ ...action.payload, type: "income" });
      saveBudgetStorage(state.budget);
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  loaddedCategory,
  addIncome,
  loaddedBudget,
} = BudgetinSlice.actions;
export default BudgetinSlice.reducer;

export const selectedDataCategory = (state) => state.budgetin.category;
export const selectedDataBudget = (state) => state.budgetin.budget;
export const selectedDataTransaction = (state) => state.budgetin.transaction;
