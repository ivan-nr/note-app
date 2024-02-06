import axios from "axios";

// const url = import.meta.env.REACT_APP_API_URL;
const url = "https://62.72.13.124";
const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
