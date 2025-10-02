// import { useEffect } from "react";
// import API from "../api/axios";
// import { useLoginAuth } from "./Usecontext-logic";

// export function useAxiosAuth() {
//   const { accessToken, setAccessToken } = useLoginAuth();
// console.log("Setting Authorization header with accessToken:", accessToken);

//   useEffect(() => {
//     const reqInterceptor = API.interceptors.request.use(config => {
//       if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
//       return config;
//     });

//     return () => {
//       API.interceptors.request.eject(reqInterceptor);
//     };
//   }, [accessToken]);

//   // update accessToken automatically after refresh
//   useEffect(() => {
//     const resInterceptor = API.interceptors.response.use(
//       res => res,
//       async error => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//           try {
//             const { data } = await API.post("/auth/refresh-token");
//             setAccessToken(data.accessToken);
//             originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
//             originalRequest._retry = true;
//             return API(originalRequest);
//           } catch (err) {
//             return Promise.reject(err);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
// console.log("Setting Authorization header with accessToken:", accessToken);

//     return () => {
//       API.interceptors.response.eject(resInterceptor);
//     };
//   }, [setAccessToken]);
// }
import { useEffect } from "react";
import API from "@/api/axios";
import { getAccessToken } from "@/utils/authStore";

export function useAxiosAuth() {
  useEffect(() => {
    const reqInterceptor = API.interceptors.request.use(config => {
      const token = getAccessToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    return () => {
      API.interceptors.request.eject(reqInterceptor);
    };
  }, []);
}
