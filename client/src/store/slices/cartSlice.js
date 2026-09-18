import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCart,
  createCheckoutSession,
  getCart,
  removeCartItem,
  updateCartItem,
  validateCoupon,
} from "../thunks/cartThunk";

const initialState = {
  cart: null,
  status: {
    fetch: "idle",
    add: "idle",
    update: "idle",
    remove: "idle",
    clear: "idle",
    coupon: "idle",
    checkout: "idle",
  },
  error: null,
  coupon: null,
  couponError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.coupon = null;
      state.couponError = null;
    },
    clearCartError: (state) => {
      state.error = null;
      state.couponError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status.fetch = "loading";
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status.fetch = "succeeded";
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.status.add = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status.add = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status.add = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.status.update = "succeeded";
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status.remove = "loading";
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.status.remove = "succeeded";
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status.remove = "failed";
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status.clear = "loading";
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status.clear = "succeeded";
        state.cart = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status.clear = "failed";
        state.error = action.payload;
      })
      .addCase(validateCoupon.pending, (state) => {
        state.status.coupon = "loading";
        state.couponError = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.status.coupon = "succeeded";
        state.coupon = action.payload;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.status.coupon = "failed";
        state.coupon = null;
        state.couponError = action.payload;
      })
      .addCase(createCheckoutSession.pending, (state) => {
        state.status.checkout = "loading";
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.status.checkout = "succeeded";
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.status.checkout = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCartState, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
