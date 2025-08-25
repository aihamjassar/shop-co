import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  loginWithGoogle,
  loginWithApple,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from "../thunks/authThunk";

const initialState = {
  user: null,
  status: {
    register: "idle",
    login: "idle",
    google: "idle",
    apple: "idle",
    refreshToken: "idle",
    logout: "idle",
    forgotPassword: "idle",
    resetPassword: "idle",
  },
  errors: {
    register: null,
    login: null,
    google: null,
    apple: null,
    refreshToken: null,
    logout: null,
    forgotPassword: null,
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
        Object.assign(state, initialState);
      } else {
        state.status[field] = "succeeded";
        state.user = action.payload?.user || null;
        state.isAuthenticate = !!state.user;
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
      .addCase(loginWithGoogle.pending, handlePending("google"))
      .addCase(loginWithGoogle.fulfilled, handleFulfilled("google"))
      .addCase(loginWithGoogle.rejected, handleRejected("google"));

    builder
      .addCase(loginWithApple.pending, handlePending("apple"))
      .addCase(loginWithApple.fulfilled, handleFulfilled("apple"))
      .addCase(loginWithApple.rejected, handleRejected("apple"));

    builder
      .addCase(refreshToken.pending, handlePending("refreshToken"))
      .addCase(refreshToken.fulfilled, handleFulfilled("refreshToken"))
      .addCase(refreshToken.rejected, handleRejected("refreshToken"));

    builder
      .addCase(logout.pending, handlePending("logout"))
      .addCase(logout.fulfilled, handleFulfilled("logout"))
      .addCase(logout.rejected, handleRejected("logout"));

    builder
      .addCase(forgotPassword.pending, handlePending("forgotPassword"))
      .addCase(forgotPassword.fulfilled, handleFulfilled("forgotPassword"))
      .addCase(forgotPassword.rejected, handleRejected("forgotPassword"));

    builder
      .addCase(resetPassword.pending, handlePending("resetPassword"))
      .addCase(resetPassword.fulfilled, handleFulfilled("resetPassword"))
      .addCase(resetPassword.rejected, handleRejected("resetPassword"));
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
