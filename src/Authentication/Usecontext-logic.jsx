
import { createContext, useContext, useState, useEffect } from "react";
import API from "@/api/axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/authStore";
import { houseDetailsFormatter } from "@/utils/houseDetailsFormatter";


const LoginAuthContext = createContext();

export function LoginAuth({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdminLogin,setIsAdminLogin]=useState(false)
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessTokenState] = useState(() => getAccessToken());
   const [houses, setHouses] = useState([]);
const [likedHouses, setLikedHouses] = useState([]);
const [myHouseReady,setMyHouseReady]=useState(false)
const [houseLoading,setHouseLoading]=useState(false)
const [user, setUser] = useState(null);
const [cursor,setCursor]=useState(
  {
    all:null,
    fullLet:null,
    shortLet:null,
    search:null
  }
);
const [hasMore,setHasMore]=useState({
  all:true,
  fullLet:true,
  shortLet:true,
  search:true
})

const [fullLet,setFullLet]=useState([])
const [shortLet,setShortLet]=useState([])
const [searchResults,setSearchResults]=useState([])

  // helper to centralize setting token in both state + sessionStorage
  const setToken = (token) => {
    setAccessToken(token);
    setAccessTokenState(token);
  };


  // handle external logout events (from axios layer)
  useEffect(() => {
    const onAuthLogout = (e) => {
      // optionally inspect e.detail.reason
      removeAccessToken();
      setAccessTokenState(null);
      setIsLogin(false);
      setUser(null);
      setLoading(false);
      // console.log("Logged out via auth:logout event", e?.detail);
    };

    window.addEventListener("auth:logout", onAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", onAuthLogout);
    };
  }, []);

  // existing returned provider...




// Fetch houses with optional filters
 const fetchHouses = async ({filters = {}, append = false,type= "all" }={}) => {

  try {
 setHouseLoading(true)
    const params = new URLSearchParams(filters);
  params.append("limit",20);

  let lastList=[];
  if(type ==="all") lastList=houses;
  if (type === "fullLet") lastList = fullLet;
  if (type === "shortLet") lastList = shortLet;
  if (type === "search") lastList = searchResults;

  if(append && lastList.length > 0 ){
    const lastHouse= lastList[lastList.length -1];
    params.append("cursor",lastHouse._id)
  }


  const url = `/houses?${params.toString()}`;


    const res = await API.get(url);

    const {houses:newHouses, nextCursor, hasMore:moreAvailable}=res.data;

    const formated=newHouses.map((house)=>houseDetailsFormatter(house))
    if(type==='search'){
      setSearchResults((prev)=>(append?[...prev, ...formated]:formated));
       setCursor((prev)=>({...prev, search :nextCursor || null}));
      setHasMore((prev)=>({...prev, search :moreAvailable}))
    }else  if(type==="fullLet"){
      setFullLet((prev)=>(append?[...prev, ...formated]:formated));
       setCursor((prev)=>({...prev, fullLet:nextCursor || null}));
      setHasMore((prev)=>({...prev, fullLet :moreAvailable}))
    }else  if(type==="shortLet"){
      setShortLet((prev)=>(append?[...prev, ...formated]:formated));
       setCursor((prev)=>({...prev, shortLet:nextCursor || null}));
      setHasMore((prev)=>({...prev, shortLet :moreAvailable}))
    }else{
      const sorted=formated.slice(0,10)
      setHouses((prev)=>(append?[...prev, ...sorted]:sorted));
      setCursor((prev)=>({...prev,all:nextCursor || null}));
      setHasMore((prev)=>({...prev, all:moreAvailable}))
    }

      return {formated}

  } catch (err) {
    // console.error("Fetch houses error:", err);
    return [];
  }finally{
    setHouseLoading(false)
  }
};

const fetchMyHouses = async () => {

  try {
    const res = await API.get("/houses/my"); // protected route
    const formatted = res.data.map((house) => houseDetailsFormatter(house))
   if(formatted){setMyHouseReady(true)}
    return formatted;
  } catch (err) {
    // console.error("Fetch my houses error:", err);
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
    // console.error("Fetch recommended houses error:", err);
    return [];
  }
};

useEffect(() => {
  if (isLogin) {
    API.get('/user/likes').then(res => setLikedHouses(res.data));
  }
}, [isLogin]);


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
    // console.error("Error toggling like:", err);
  }
};
const fetchUserProfile = async () => {
  try {
    const res = await API.get("/auth/me"); // endpoint that returns current user
    setUser(res.data);
  } catch (err) {
    // console.error("Error fetching user profile:", err);
    setUser(null);
  }
};


// Clear all house lists to force re-fetches (e.g., after creating a listing/logging out)
const refreshHouses = () => {
    setHouses([]);
    setFullLet([]);
    setShortLet([]);
    setSearchResults([]);
    setCursor({ all: null, fullLet: null, shortLet: null, search: null });
    setHasMore({ all: true, fullLet: true, shortLet: true, search: true });
};


useEffect(() => {
  if (accessToken && !user) {
    fetchUserProfile();
  }else if(!accessToken){
    // Also clear houses if user logs out or token is invalid
    refreshHouses();

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
    // console.log('init load error',error)
   }finally{
    setLoading(false)
   }
  }
load()
  }, []);


// useEffect(() => {
//   async function initAuth() {
//     const token = getAccessToken();

//     if (token) {
//       try {
//         setAccessTokenState(token);
//         setIsLogin(true);
//         await fetchUserProfile(); // load user info
//       } catch (err) {
//         console.error("Token invalid, removing...");
//         removeAccessToken();
//         setIsLogin(false);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }

//     // No token? Try refresh once
//     try {
//       const res = await API.post("/auth/refresh-token");
//       const newToken = res.data?.accessToken;
//       if (newToken) {
//         setToken(newToken);
//         setIsLogin(true);
//         await fetchUserProfile();
//       } else {
//         setIsLogin(false);
//       }
//     } catch (err) {
//       console.log("No valid refresh token, user logged out.");
//       setIsLogin(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   initAuth();
// }, [accessToken]);


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
  // Helper to manually update user state (e.g. after profile edit)
  const updateUser = (userData) => {
    setUser(userData);
  };

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const token = res.data?.accessToken;
    if (token) {
      setToken(token);
      setIsLogin(true);
    }
    return res;
  };


  const adminLogin=async(email,password)=>{

    const res=await API.post("/auth/admin-login",{email,password});
    const token =res.data?.accessToken;
    if(token){
      setToken(token);
      setIsAdminLogin(true)
    }
  }
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
      value={{ isLogin, setIsLogin, loading, login, logout, accessToken, setAccessToken: setToken,houses,setHouses,fetchHouses,fetchRecommendedHouses,fetchMyHouses,toggleLike,likedHouses,user, updateUser, houseLoading,fullLet,shortLet,searchResults,hasMore, refreshHouses,isAdminLogin,setIsAdminLogin,adminLogin  }}
    >
    {children}
    </LoginAuthContext.Provider>
    // :
  );
}

export function useLoginAuth() {
  return useContext(LoginAuthContext);
}
