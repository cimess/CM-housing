
import { createContext, useContext, useState, useEffect } from "react";
import API from "@/api/axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/authStore";
import { houseDetailsFormatter } from "@/utils/houseDetailsFormatter";


const LoginAuthContext = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState(() => getAccessToken());
   const [houses, setHouses] = useState([]);
   const [houseLoading,setHouseLoading]=useState(true)
  // helper to centralize setting token in both state + sessionStorage
  const setToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };
 async function fetchHouses() {
      try {
        console.log('i reached here ')
        const res = await API.get("/houses"); // axios
        const formatted = res.data.map(houseDetailsFormatter);
        console.log('i got it it here',formatted)
        setHouses(formatted);
      } catch (err) {
        console.error("Error fetching houses:", err);
      } finally{
        setHouseLoading(false)
      }
    }


  useEffect(() => {
   
    fetchHouses();
  }, []);




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
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken: setToken,houses,fetchHouses }}
    >
    { houseLoading?<p>Loading...</p>: children}
    </LoginAuthContext.Provider>
  );
}

export function useLoginAuth() {
  return useContext(LoginAuthContext);
}
