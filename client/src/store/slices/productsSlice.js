import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../thunks/productsThunk";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => (state.error = null),
    setProducts: (state, products) => (state.products = products),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload.productId;
        state.products = state.products.filter((product) => product._id !== id);
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setProducts, clearError } = productsSlice.actions;
export default productsSlice.reducer;
