import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const register = createAsyncThunk(
  "auth/register",
  async (userDate, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userDate);
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/google",
  async (access_token, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/google", {
        access_token,
      });
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign up failed");
    }
  }
);

export const loginWithApple = createAsyncThunk(
  "auth/apple",
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/apple", {
        code,
      });
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sign up failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/refresh-token");
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Session expired, please login again"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      return { resetURL: data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/auth/reset-password/${token}`,
        formData
      );
      return { user: data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);
