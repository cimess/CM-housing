import Input from "@/body component/input-component";
import { Link,useNavigate  } from "react-router-dom";
import {motion} from "framer-motion"
import API from "@/api/axios";
import { useState,useEffect } from "react";
import {useLoginAuth } from "@/Authentication/Usecontext-logic";


export default function ResetPassword(){
   const navigate=useNavigate()
   const{isLogin}=useLoginAuth()
const [password,setPassword]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')
const [oldPassword,setOldPassword]=useState('')

useEffect(()=>{
if(!isLogin)return navigate('/')

},[isLogin,navigate])

  async function handleResetPassword(e){
   e.preventDefault()
   
   if(password!==confirmPassword)return alert("new password must match confirm password")
try{
   
      const request=await API.post("auth/reset-password",{oldPassword, newPassword: password})
      alert(request.data.message)
   }catch(e){
      if(e.response){
      console.log(e.response.data.message)
      }else{
         console.log(e.message)
      }  
   }
   }

   return(
      <div>{isLogin&&
      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}>

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
Reset Your Password
   </h1>
   <div className="w-[80%] mx-auto">
 
 <p className="my-5">Please enter your New Password</p>
   </div>
  <form className=" w-[80%] mx-auto text-left mt-8">
   <Input label='Old Password' type='password' id='oldPassword' onChange={(e)=>setOldPassword(e.target.value)} inputValue={oldPassword} />
  <Input label='Reset Password' type='password' id='newPassword' onChange={(e)=>setPassword(e.target.value)} inputValue={password} />
   <Input label='Confirm Password' type='password' id='confirmPassword' onChange={(e)=>setConfirmPassword(e.target.value)} inputValue={confirmPassword} />

 <div className="text-center "><button className="button rounded-full mt-7 w-[180px] " onClick={handleResetPassword}>Reset Password</button></div>




  </form>
  <div className=" my-5">
 <Link to='/' className="underline ml-2 hover:no-underline">Go Home</Link>
</div>
</div>
</motion.div>
}
</div>
   )
}