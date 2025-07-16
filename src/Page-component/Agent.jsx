import  Input  from "../body component/input-component";
import ImageBox from "@/body component/image-componet";
import image from '../assets/images/my-banners/banner2.jpg'
export default function HouseRegister(){

   return(
      <>
  
         <ImageBox src={image} noradius='no' /> 
    
 
<div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
   <h1 className="font-montserrat my-5">
List Your House
   </h1>
   <div className="mb-8">
 <span className="text-gray-600 ">Register with us </span>
   </div>
  <form className=" w-[80%] mx-auto text-left">
   <div className="grid grid-cols-2 gap-x-5">
      <Input label='Company Name' add='*' type='text' id='company'/>
      <Input label='Website Link [optional]' add='*' type='text' id='website'/>
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
</>
   )
}