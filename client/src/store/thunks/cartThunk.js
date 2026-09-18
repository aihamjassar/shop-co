import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

export const getCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/carts");
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      return rejectWithValue(getErrorMessage(error, "Failed to load cart"));
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/carts", cartItem);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add product to cart"));
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/carts", {
        itemId,
        quantity,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update cart"));
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/carts/${itemId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to remove product"));
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/carts");
      return null;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to clear cart"));
    }
  },
);

export const validateCoupon = createAsyncThunk(
  "cart/validateCoupon",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/coupons", { code });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Invalid coupon code"));
    }
  },
);

export const createCheckoutSession = createAsyncThunk(
  "cart/createCheckoutSession",
  async ({ cartId, couponCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        { cartId, couponCode },
      );
      const session = response.data.data;
      return {
        sessionId: typeof session === "string" ? session : session.id,
        checkoutUrl: typeof session === "string" ? null : session.url,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to start checkout"));
    }
  },
);
