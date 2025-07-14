// import { LogIn } from "lucide-react";
import Default from "@/home-component/header-footer";
import { Link } from "react-router-dom";
export default function Login(){

   return(

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
Login as Guest
   </h1>
   <div>
 <span className="text-gray-600 mb-5">Dont have have an account? </span><Link to='/Register' className="underline ml-2">Register now</Link>
   </div>
  <form className=" w-[80%] mx-auto text-left">
   <label className="block text-sm font-bold my-3">Email</label>
   <input type="email" className="border rounded border-gray-300 w-full  focus:outline-none h-10"/>
   <label className="block text-sm font-bold my-3">Password</label>
  <input 
  type="password" 
  className="border rounded border-gray-300 w-full focus:outline-none h-10"
/>

 <div className="flex space-x-3 items-center mt-7">
  <input 
  type="checkbox" 
  className="border rounded border-gray-300 focus:outline-none h-5 w-5 accent-black"
/>
<label className="text-sm my-3 text-gray-500">Remember me</label>
 </div>
<div className="text-center"><button className="button rounded-full mt-7 w-[150px]">Login</button></div>


<hr className="mt-15 text-gray-300"/>
<Link className="text-center block mt-5" to='/register'>Forgot Password?</Link>
  </form>

</div>

   )
}