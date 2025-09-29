import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 20000,
});

export default api;