import { Link } from "react-router-dom";
import Input from "@/body component/input-component";
export default function LoginComponent({header}){

   return(

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5 ">
{header}
   </h1>
   <div>
 <span className="text-gray-600 mb-5">Dont have have an account? </span><Link to='/Register' className="underline ml-2">Register now</Link>
   </div>
  <form className=" w-[80%] mx-auto text-left">
  <Input label='Email' type='email' id='email'/>
  <Input label='Password' type='password' id='password'/>

 <div className="flex space-x-3 items-center mt-7">
  <input 
  type="checkbox" 
  className="border rounded border-gray-300 focus:outline-none h-5 w-5 accent-black"
/>
<label className="text-sm my-3 text-gray-500">Remember me</label>
 </div>
<div className="text-center"><button className="button rounded-full mt-7 w-[150px]">Login</button></div>


<hr className="mt-15 text-gray-300"/>
<Link className="text-center block mt-5" to='/RecoverPassword'>Forgot Password?</Link>
  </form>

</div>

   )
}