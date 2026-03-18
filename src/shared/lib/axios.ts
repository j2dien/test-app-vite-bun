import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { ApiError } from "@/shared/types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor ───────────────────────────────────
// Otomatis attach Bearer token ke setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ──────────────────────────────────
// Normalisasi error dari server menjadi ApiError yang konsisten
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    // Token expired → bersihkan sesi dan redirect ke login
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Lemparkan error yang sudah dinormalisasi
    const message =
      error.response?.data?.message ??
      error.message ??
      "Terjadi kesalahan. Coba lagi.";

    return Promise.reject(new Error(message));
  },
);
