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
      } catch (err) {
        setIsLogin(false);
      } finally {
        setLoading(false);
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
