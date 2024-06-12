import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const secretKey = "Budgetin2024";

const SaveLocalStorage = (data) => {
  try {
    const EncyptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    localStorage.setItem("BCategory", EncyptedData);
  } catch (error) {
    console.log(error);
  }
};

const loadFromStorage = (name) => {
  try {
    const encryptedData = localStorage.getItem("BCategory");

    if (!encryptedData) {
      return [];
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const dataUsername = decryptedData.filter((data) => data.user === name);

    return dataUsername || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const initialState = {
  category: [],
  budget: [],
};

const BudgetinSlice = createSlice({
  name: "budgetin",
  initialState,
  reducers: {
    loaddedCategory: (state, action) => {
      state.category = loadFromStorage(action.payload);
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
      SaveLocalStorage(state.category);
    },
    deleteCategory: (state, action) => {
      state.category = state.category.filter(
        (item) => item.id !== action.payload
      );
      SaveLocalStorage(state.category);
    },
    addIncome: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addCategory, deleteCategory, loaddedCategory, addIncome } =
  BudgetinSlice.actions;
export default BudgetinSlice.reducer;

export const selectedDataCategory = (state) => state.budgetin.category;
export const selectedDataBudget = (state) => state.budgetin.budget;
