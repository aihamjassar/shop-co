import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.Slice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
