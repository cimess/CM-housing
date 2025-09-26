import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";  

const loginAuthProvider = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        await API.get("/auth/me", { withCredentials: true });
        setIsLogin(true);
        console.log(isLogin)
      } catch (err) {
        setIsLogin(false);
        console.log(isLogin)
      } finally {
        setLoading(false);
        console.log(isLogin)
      }
    }
    checkSession();
  }, []);

  return (
    <loginAuthProvider.Provider value={{ isLogin, setIsLogin, loading }}>
      {children}
    </loginAuthProvider.Provider>
  );
}

export function useLoginAuth() {
  return useContext(loginAuthProvider);
}
