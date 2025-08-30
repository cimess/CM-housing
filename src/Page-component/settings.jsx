import {message} from '@/data/messageBox'


export default function Settings(){

    return(
     <div className={` h-[500px] mx-3  shadow w-full overflow-y-scroll [scrollbar-width:none]`}>
   
<h2 className="text-xl text-center mt-3 border-b font-semibold">
  Settings
</h2>

<div className="p-2 ">
  


  <form className=" mx-auto text-left mb-3" >

<h2 className="text-lg text-center mt-3 mb-2 font-medium">
  Personal details
</h2>

<div className="w-[90%] mx-auto "> <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Firstname</legend>
 <input
   type='text'
    id='text'
     className="input pb-1 px-2 "
     value={message[0].name}/>
</fieldset>

 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Lastname</legend>
 <input  
 type='text' 
 id='text' 
 className="input pb-1 px-2"
  value={message[0].lastname}/>
</fieldset>

 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Email</legend>
 <input  
 type='email' 
 id='email'
  className="input pb-1 px-2 w-full"
   value={message[0].email}/>
</fieldset>


 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Old Password</legend>
 <input  
 type='text' 
 id='text' 
 className="input pb-1 px-2"
  value={message[0].password}
 />
</fieldset>

 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Confirm Password</legend>
 <input  type='password' id='password' className="input pb-1 px-2"/>
</fieldset></div>


<div className="w-[90%] mx-auto mt-5"> 
   <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Phone Number</legend>
 <input 
  type='text' 
  id='text' 
  className="input pb-1 px-2 w-full" 
  maxLength={15}
   value={message[0].phone}/>
</fieldset>

 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Address</legend>
 <input 
  type='text' 
  id='text' 
  className="input pb-1 px-2 w-full"
   value={message[0].location}/>
</fieldset>

 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Whatsapp Contact</legend>
 <input 
  type='text' 
  id='text'
   className="input pb-1 px-2 w-full" 
   maxLength={15}
    value={message[0].phone} />
</fieldset>


 <fieldset className="border rounded " >
  <legend className="ml-3 font-light">Website</legend>
 <input  
 type='text'
  id='text'
   className="input pb-1 px-2 w-full"
    value={message[0].website}/>
</fieldset>


</div>


<div className="text-center"><button className="button rounded-full mt-7 w-[90px]" >save</button></div>

  </form>

</div>
</div>

  )
}