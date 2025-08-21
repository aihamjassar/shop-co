import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  refreshToken,
  logout,
  forgetPassword,
  resetPassword,
} from "../thunks/authThunk";

const initialState = {
  user: null,
  status: {
    register: "idle",
    login: "idle",
    refreshToken: "idle",
    logout: "idle",
    forgetPassword: "idle",
    resetPassword: "idle",
  },
  errors: {
    register: null,
    login: null,
    refreshToken: null,
    logout: null,
    forgetPassword: null,
    resetPassword: null,
  },
  isAuthenticate: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      const field = action.payload;
      state.errors[field] = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticate = true;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (field) => (state) => {
      state.status[field] = "loading";
      state.errors[field] = null;
    };

    const handleFulfilled = (field) => (state, action) => {
      if (field === "logout") {
        state.status[field] = "idle";
        state.user = null;
        state.isAuthenticate = false;
      } else {
        state.status[field] = "succeeded";
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticate = true;
        }
      }
    };

    const handleRejected = (field) => (state, action) => {
      state.status[field] = "failed";
      state.errors[field] = action.payload || action?.error.message;
    };

    builder
      .addCase(register.pending, handlePending("register"))
      .addCase(register.fulfilled, handleFulfilled("register"))
      .addCase(register.rejected, handleRejected("register"));

    builder
      .addCase(login.pending, handlePending("login"))
      .addCase(login.fulfilled, handleFulfilled("login"))
      .addCase(login.rejected, handleRejected("login"));

    builder
      .addCase(refreshToken.pending, handlePending("refreshToken"))
      .addCase(refreshToken.fulfilled, handleFulfilled("refreshToken"))
      .addCase(refreshToken.rejected, handleRejected("refreshToken"));

    builder
      .addCase(logout.pending, handlePending("logout"))
      .addCase(logout.fulfilled, handleFulfilled("logout"))
      .addCase(logout.rejected, handleRejected("logout"));

    builder
      .addCase(forgetPassword.pending, handlePending("forgetPassword"))
      .addCase(forgetPassword.fulfilled, handleFulfilled("forgetPassword"))
      .addCase(forgetPassword.rejected, handleRejected("forgetPassword"));

    builder
      .addCase(resetPassword.pending, handlePending("resetPassword"))
      .addCase(resetPassword.fulfilled, handleFulfilled("resetPassword"))
      .addCase(resetPassword.rejected, handleRejected("resetPassword"));
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
