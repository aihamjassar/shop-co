import axios from "axios";
import { logout, refreshToken } from "../store/thunks/authThunk";
import { store } from "../store/store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        if (refreshPromise) {
          await refreshPromise;
        } else {
          refreshPromise = store.dispatch(refreshToken());
          await refreshPromise;
        }

        refreshPromise = null;
        return axiosInstance(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        refreshPromise = null;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
