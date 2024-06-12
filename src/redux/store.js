import { configureStore } from "@reduxjs/toolkit";
import BudgetinReduce from "./slices/slice";

const store = configureStore({
  reducer: {
    budgetin: BudgetinReduce,
  },
});
export default store;
