import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.Slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
