
import { createContext, useContext, useState, useEffect } from "react";
import API from "@/api/axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/authStore";
import { houseDetailsFormatter } from "@/utils/houseDetailsFormatter";
import LoadingAnimation from "@/animations/LoadingAnim";

const LoginAuthContext = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState(() => getAccessToken());
   const [houses, setHouses] = useState([]);
const [likedHouses, setLikedHouses] = useState([]);

   const [houseLoading,setHouseLoading]=useState(true)
  // helper to centralize setting token in both state + sessionStorage
  const setToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };



// Fetch houses with optional filters
 const fetchHouses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = `/houses${params ? `?${params}` : ""}`;

  try {
    const res = await API.get(url);
    const formated=res.data.map((house)=>houseDetailsFormatter(house))
      return formated
    
  } catch (err) {
    console.error("Fetch houses error:", err);
    return [];
  }
};

const fetchMyHouses = async () => {
  try {
    const res = await API.get("/houses/my"); // protected route
    const formatted = res.data.map((house) => houseDetailsFormatter(house));
    console.log("Fetch my houses error:", res.data);
    return formatted;
  } catch (err) {
    console.error("Fetch my houses error:", err);
    return [];
  }
};


// Get recommended houses (random sample)
const fetchRecommendedHouses = async () => {
  try {
    const res = await API.get("/houses");
    const data = res.data;

    // Just shuffle + slice 3 results for now
    return data.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (err) {
    console.error("Fetch recommended houses error:", err);
    return [];
  }
};

// Toggle like on backend + update global state
const toggleLike = async (houseId) => {
  try {
    await API.post(`/houses/${houseId}/like`);
    setLikedHouses((prev) =>
      prev.includes(houseId)
        ? prev.filter((id) => id !== houseId) // unlike
        : [...prev, houseId] // like
    );
  } catch (err) {
    console.error("Error toggling like:", err);
  }
};



  useEffect( () => {
   
    async function load(){
  const house=await  fetchHouses();
    setHouses(house)}
load()
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
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken: setToken,houses,fetchHouses,fetchRecommendedHouses,fetchMyHouses,toggleLike,likedHouses }}
    >
    { children}
    </LoginAuthContext.Provider>
    // houseLoading?<LoadingAnimation/>: 
  );
}

export function useLoginAuth() {
  return useContext(LoginAuthContext);
}
