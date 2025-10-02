// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true, // cookies sent automatically
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // RESPONSE INTERCEPTOR: handles 401 → refresh token
// API.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(token => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return API(originalRequest);
//           })
//           .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await API.post("/auth/refresh-token"); // cookie sent automatically
//         // this will update the accessToken in context via useAxiosAuth
//         processQueue(null, data.accessToken);
//         return API(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/authStore";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // important: send HttpOnly refresh cookie
});

// Request interceptor: attach the current access token (from sessionStorage)
API.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Refresh queue (single refresh flow)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If no response or not 401, reject immediately
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // avoid retrying refresh endpoint itself
    if (originalRequest._retry) return Promise.reject(error);

    // if another refresh in progress: queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return API(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const resp = await API.post("/auth/refresh-token"); // cookie sent automatically
      const newAccessToken = resp.data?.accessToken;

      if (!newAccessToken) {
        // refresh failed, clear storage and reject queue
        removeAccessToken();
        processQueue(new Error("No access token returned"), null);
        return Promise.reject(error);
      }

      // persist new token (sessionStorage)
      setAccessToken(newAccessToken);

      // resolve queued requests
      processQueue(null, newAccessToken);

      // retry the original request with new token
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return API(originalRequest);
    } catch (err) {
      // refresh failed: clear token and reject queued requests
      removeAccessToken();
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default API;
