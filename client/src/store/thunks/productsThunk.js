import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { useSelector } from "react-redux";

export const getAllProducts = createAsyncThunk(
  "products/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products");
      return { products: res.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/product",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`products/${id}`);
      return { product: res.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("products", product);
      const { products } = useSelector((state) => state.products);
      return [...products, res.data.data];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`products/${id}`, product);
      const updatedProduct = res.data.data;
      const { products } = useSelector((state) => state.products);
      return products.map((product) =>
        product._id === id ? updatedProduct : product
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`products/${id}`);

      return {
        productId: id,
      };
    } catch (error) {
      console.log("rejected");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);
