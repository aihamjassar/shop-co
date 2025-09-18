import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
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
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, handleRejected);
    builder
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, handleRejected);
    builder
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const updatedProduct = action.payload.updatedProduct;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._d ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, handleRejected);
    builder
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload.productId;
        state.products = state.products.filter((product) => product._id !== id);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export const { setProducts, clearError } = productsSlice.actions;
export default productsSlice.reducer;
