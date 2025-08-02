


import { createContext,useContext,useState } from "react";

const loginAuthProvider=createContext()

export  function LoginAuth({children}){
   const [isLogin,setIsLogin]=useState(false)
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