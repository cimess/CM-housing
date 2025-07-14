
import Default from "@/home-component/header-footer";
import  Input  from "../body component/input-component";
import { Link } from "react-router-dom";
export default function Register(){

   return(

<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
Guest Registration
   </h1>
   <div className="mb-8">
 <span className="text-gray-600 ">Join us and explore homes made for you  </span>
   </div>
  <form className=" w-[80%] mx-auto text-left">
   <div className="grid grid-cols-2 gap-x-5">
      <Input label='First name' add='*' type='text' id='firstname'/>
      <Input label='Last name' add='*' type='text' id='lastname'/>
      <Input label='Email address' add='*' type='email' id='email'/>
      <Input label=' Confirm email address' add='*' type='email' id='confirmemail'/>
    <Input label='password' add='*' type='password' id='password'/>
    <Input label='Confirm password' add='*' type='password' id='confirmpassword' />

   </div>
   
  <div className="my-4 flex items-center gap-x-3 text-sm text-gray-500">
   <input type='checkbox' className='h-4 w-4 accent-black' /> <label > Subscribe to news letter</label>
  </div>
<div className="text-center"><button className="button rounded-full mt-7 w-[150px]">Register</button></div>


<hr className="mt-15 text-gray-300"/>

  </form>

</div>

   )
}