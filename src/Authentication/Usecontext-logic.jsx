// import { createContext, useContext, useState, useEffect } from "react";
// import API from "../api/axios";  
// // import * as SecureStore from 'expo-secure-store';
// const loginAuthProvider = createContext();

// export function LoginAuth({ children }) {
//   const [isLogin, setIsLogin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function checkSession() {
//       try {
//         await API.get("/auth/me", { withCredentials: true });
//         setIsLogin(true);
       
//       } catch (err) {
//         setIsLogin(false);
//       } finally {
//         setLoading(false);
//       }
//     }
//     checkSession();
//   }, []);
  
//   useEffect(() => {
//   console.log("isLogin changed →", isLogin);
// }, [isLogin]);


//   return (
//     <loginAuthProvider.Provider value={{ isLogin, setIsLogin, loading }}>
//       {children}
//     </loginAuthProvider.Provider>
//   );
// }

// export function useLoginAuth() {
//   return useContext(loginAuthProvider);
// }

import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const loginAuthProvider = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // ------------------ CHECK SESSION ------------------
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await API.post("/auth/refresh-token"); // cookie sent automatically
        setAccessToken(res.data.accessToken);
        setIsLogin(true);
      } catch (err) {
        setIsLogin(false);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  // ------------------ LOGIN ------------------
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { accessToken: token } = res.data;
    setAccessToken(token);
    setIsLogin(true);
  };

  // ------------------ LOGOUT ------------------
  const logout = async () => {
    await API.post("/auth/logout"); // cookie handled by backend
    setAccessToken(null);
    setIsLogin(false);
  };

  return (
    <loginAuthProvider.Provider
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken }}
    >
      {children}
    </loginAuthProvider.Provider>
  );
}

export function useLoginAuth() {
  return useContext(loginAuthProvider);
}
