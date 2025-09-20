


import { createContext,useContext,useState,useEffect } from "react";

const loginAuthProvider=createContext()

export  function LoginAuth({children}){
   const [isLogin,setIsLogin]=useState(false)
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check session on app load
    async function checkSession() {
      try {
        const res =  await axios.get(`${API_URL}/auth/me`, { withCredentials: true })
        setIsLogin(true);
      } catch (err) {
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);
return(
   <loginAuthProvider.Provider value={{isLogin,setIsLogin}}>
    {children}
   </loginAuthProvider.Provider>
)
}

export function useLoginAuth(){
return(
   useContext(loginAuthProvider)
)
}

