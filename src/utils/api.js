import axios from "axios";

const url = "https://62.72.13.124";

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userID");
    if (token && userId) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
