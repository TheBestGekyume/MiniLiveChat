import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://minilivechatdb.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
