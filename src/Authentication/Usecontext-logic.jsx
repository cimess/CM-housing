

// import { createContext, useContext, useState, useEffect } from "react";
// import API from "../api/axios";

// const loginAuthProvider = createContext();

// export function LoginAuth({ children }) {
//   const [isLogin, setIsLogin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [accessToken, setAccessToken] = useState(null);

//   // ------------------ CHECK SESSION ------------------
//   useEffect(() => {
//     async function checkSession() {
//       try {
//         const res = await API.post("/auth/refresh-token"); // cookie sent automatically
//         setAccessToken(res.data.accessToken);
//         setIsLogin(true);
//       } catch (err) {
//         setIsLogin(false);
//         setAccessToken(null);
//       } finally {
//         setLoading(false);
//       }
//     }
//     checkSession();
//   }, []);

//   // ------------------ LOGIN ------------------
//   const login = async (email, password) => {
//     const res = await API.post("/auth/login", { email, password });
//     const { accessToken: token } = res.data;
//     setAccessToken(token);
//     setIsLogin(true);
//   };

//   // ------------------ LOGOUT ------------------
//   const logout = async () => {
//     await API.post("/auth/logout"); // cookie handled by backend
//     setAccessToken(null);
//     setIsLogin(false);
//   };

//   return (
//     <loginAuthProvider.Provider
//       value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken }}
//     >
//       {children}
//     </loginAuthProvider.Provider>
//   );
// }

// export function useLoginAuth() {
//   return useContext(loginAuthProvider);
// }

import { createContext, useContext, useState, useEffect } from "react";
import API from "@/api/axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/authStore";

const LoginAuthContext = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState(() => getAccessToken());

  // helper to centralize setting token in both state + sessionStorage
  const setToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };

  // startup: if sessionStorage has token, use it; otherwise try one refresh attempt
  useEffect(() => {
    async function init() {
      const token = getAccessToken();
      if (token) {
        setAccessTokenState(token);
        setIsLogin(true);
        setLoading(false);
        return;
      }

      // Only attempt a single refresh on load (do not loop)
      try {
        const res = await API.post("/auth/refresh-token");
        const newToken = res.data?.accessToken;
        if (newToken) {
          setToken(newToken);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          removeAccessToken();
        }
      } catch (err) {
        setIsLogin(false);
        removeAccessToken();
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // login: keep behavior (store token in sessionStorage)
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const token = res.data?.accessToken;
    if (token) {
      setToken(token);
      setIsLogin(true);
    }
    return res;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      // ignore
    }
    removeAccessToken();
    setAccessTokenState(null);
    setIsLogin(false);
  };

  return (
    <LoginAuthContext.Provider
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken: setToken }}
    >
      {children}
    </LoginAuthContext.Provider>
  );
}

export function useLoginAuth() {
  return useContext(LoginAuthContext);
}
