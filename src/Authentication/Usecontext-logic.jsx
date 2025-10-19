
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
const [likedHouses, setLikedHouses] = useState([]);
const [myHouseReady,setMyHouseReady]=useState(false)
const [houseLoading,setHouseLoading]=useState(false)
const [user, setUser] = useState(null);

  // helper to centralize setting token in both state + sessionStorage
  const setToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };

  // near top imports

// ... other imports



  // ... existing state and functions

  // handle external logout events (from axios layer)
  useEffect(() => {
    const onAuthLogout = (e) => {
      // optionally inspect e.detail.reason
      removeAccessToken();
      setAccessTokenState(null);
      setIsLogin(false);
      setUser(null);
      setLoading(false);
      console.log("Logged out via auth:logout event", e?.detail);
    };

    window.addEventListener("auth:logout", onAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", onAuthLogout);
    };
  }, []);

  // existing returned provider...




// Fetch houses with optional filters
 const fetchHouses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = `/houses${params ? `?${params}` : ""}`;
 setHouseLoading(true)
  try {
    const res = await API.get(url);
    const formated=res.data.map((house)=>houseDetailsFormatter(house))
    setHouses(formated)
      return formated
    
  } catch (err) {
    console.error("Fetch houses error:", err);
    return [];
  }finally{
    setHouseLoading(false)
  }
};

const fetchMyHouses = async () => {
  setLoading(true)
  try {
    const res = await API.get("/houses/my"); // protected route
    const formatted = res.data.map((house) => houseDetailsFormatter(house));
   if(formatted){setMyHouseReady(true)}
    return formatted;
  } catch (err) {
    console.error("Fetch my houses error:", err);
    return [];
  }finally{
    setLoading(false)
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
const fetchUserProfile = async () => {
  try {
    const res = await API.get("/auth/me"); // endpoint that returns current user
    setUser(res.data);
     console.log("fetching user profile:", res.data);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    setUser(null);
  }
};


useEffect(() => {
  if (accessToken && !user) {
    fetchUserProfile();
  }else if(!accessToken){
setUser(null);
setIsLogin(false)
  }
}, [accessToken]);








  useEffect( () => {
   
    async function load(){
      try{
  // const house=await  fetchHouses();
  await fetchUserProfile()
    // setHouses(house)
  }
   catch(error){
    console.log('init load error',error)
   }finally{
    setLoading(false)
   }
  }
load()
  }, []);




  // startup: if sessionStorage has token, use it; otherwise try one refresh attempt
  useEffect(() => {
    async function init() {
      const token = getAccessToken();
      if (token) {
        try{
          await fetchUserProfile()
        setAccessTokenState(token);
        setIsLogin(true);
        
        }catch{
          removeAccessToken()
          setIsLogin(false)
        }finally{
setLoading(false);
        }
        return
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
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken: setToken,houses,setHouses,fetchHouses,fetchRecommendedHouses,fetchMyHouses,toggleLike,likedHouses,user,houseLoading  }}
    >
    {children}
    </LoginAuthContext.Provider>
    // : 
  );
}

export function useLoginAuth() {
  return useContext(LoginAuthContext);
}
