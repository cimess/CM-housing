// src/api/axios.js
import axios from "axios";
import { getAccessToken, setAccessToken } from "@/utils/authStore"; // we'll make this

const API = axios.create({
  baseURL: "https://cm-housing.onrender.com/api",
  withCredentials: true, // cookies (refresh token) always included
});

// Add interceptor to refresh accessToken on 401
API.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await API.post("/auth/refresh-token", {}, { withCredentials: true });
        setAccessToken(data.accessToken);
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return API(error.config);
      } catch (err) {
        // ⛔ stop retrying if refresh fails
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
;

export default API;
