import Input from "@/body component/input-component";
import { Link } from "react-router-dom";


export default function RecoverPassword(){

   return(

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
Recover Your Password
   </h1>
   <div className="w-[80%] mx-auto">
 
 <p className="my-5">Please enter your email address. You will receive a link to create a new password via email.</p>
   </div>
  <form className=" w-[80%] mx-auto text-left mt-8">
  <Input label='Email address' type='email' id='recovery'  />

 <div className="text-center "><button className="button rounded-full mt-7 w-[180px] ">Recover Password</button></div>




  </form>
  <div className=" my-5">
  <span className="text-gray-600 ">Remember your password? </span><Link to='/Login' className="underline ml-2 hover:no-underline">Back to login</Link>
</div>
</div>

   )
}