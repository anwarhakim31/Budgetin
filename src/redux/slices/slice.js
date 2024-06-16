import { createSlice } from "@reduxjs/toolkit";
import {
  SaveCategoryStorage,
  SaveTransactionStorage,
  loadBudgetStorage,
  loadCategoryStorage,
  loadTransactionStorage,
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
    loaddedTransaction: (state, action) => {
      state.transaction = loadTransactionStorage(action.payload);
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
      const { user, id, income, category, expense } = action.payload;

      const selectIndex = state.budget.findIndex(
        (item) => item.category.name === category.name
      );

      if (selectIndex !== -1) {
        state.budget[selectIndex].income += income;
      } else {
        state.budget.push({ user, id, income, expense, category });
      }
      state.transaction.push({ ...action.payload, type: "income" });
      saveBudgetStorage(state.budget);
      SaveTransactionStorage(state.transaction);
    },
    addExpense: (state, action) => {
      const { category, expense } = action.payload;

      const selectIndex = state.budget.findIndex(
        (item) => item.category.name === category.name
      );

      if (selectIndex !== -1) {
        state.budget[selectIndex].expense += expense;

        state.transaction.push({ ...action.payload, type: "expense" });
        saveBudgetStorage(state.budget);
        SaveTransactionStorage(state.transaction);
      }
    },
    deleteAll: (state, action) => {
      const selectIndex = state.budget.findIndex(
        (item) => item.category.name === action.payload.category.name
      );

      state.transaction = state.transaction.filter(
        (item) =>
          !(
            item.date === action.payload.date &&
            item.amount === action.payload.amount &&
            item.category.name === action.payload.category.name
          )
      );

      if (selectIndex !== -1) {
        if (action.payload.type === "income") {
          state.budget[selectIndex].income -= action.payload.amount;
        } else {
          state.budget[selectIndex].expense -= action.payload.amount;
        }

        if (state.budget[selectIndex].income === 0) {
          state.budget = state.budget.filter(
            (item) => item.category.name !== action.payload.category.name
          );
        }
      }
      saveBudgetStorage(state.budget);
      SaveTransactionStorage(state.transaction);
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  loaddedCategory,
  addIncome,
  loaddedBudget,
  addExpense,
  loaddedTransaction,
  deleteAll,
} = BudgetinSlice.actions;
export default BudgetinSlice.reducer;

export const selectedDataCategory = (state) => state.budgetin.category;
export const selectedDataBudget = (state) => state.budgetin.budget;
export const selectedDataTransaction = (state) => state.budgetin.transaction;
export const selectedTotalIncome = (state) =>
  state.budgetin.budget.reduce((total, item) => total + item.income, 0);
export const selectedTotalExpense = (state) =>
  state.budgetin.budget.reduce((total, item) => total + item.expense, 0);

export const selectedEndingBalance = (state) =>
  state.budgetin.budget.reduce(
    (total, item) => total + (item.income - item.expense),
    0
  );
