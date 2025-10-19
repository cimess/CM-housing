import Input from "@/body component/input-component";
import { Link } from "react-router-dom";
import {motion, setStyle} from "framer-motion"
import API from "@/api/axios";
import { useState } from "react";
export default function RecoverPassword(){
const [state,setState]=useState('')
  async function handleResetPassword(e){
   e.preventDefault()
try{
      const request=await API.post("auth/forgot-password",{ email: state})
      alert(request.data.message)
   }catch(e){
      console.log(e);   
   }
   }

   return(
      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}>

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
Recover Your Password
   </h1>
   <div className="w-[80%] mx-auto">
 
 <p className="my-5">Please enter your email address. You will receive a link to create a new password via email.</p>
   </div>
  <form className=" w-[80%] mx-auto text-left mt-8">
  <Input label='Email address' type='email' id='recovery' onChange={(e)=>setState(e.target.value)} inputValue={state} />

 <div className="text-center "><button className="button rounded-full mt-7 w-[180px] " onClick={handleResetPassword}>Recover Password</button></div>




  </form>
  <div className=" my-5">
  <span className="text-gray-600 ">Remember your password? </span><Link to='/Login' className="underline ml-2 hover:no-underline">Back to login</Link>
</div>
</div>
</motion.div>
   )
}