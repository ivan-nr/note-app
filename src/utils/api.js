import axios from "axios";

// const url = import.meta.env.REACT_APP_API_URL;
const url = "https://62.72.13.124";

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
