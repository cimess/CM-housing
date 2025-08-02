import {  message } from "@/data/messageBox"
import { faArrowLeft, faBars, faCamera, faFaceGrin, faPaperclip, faPhone, faSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

import { useState } from "react"


export default function MyMessagePage(){

const [state,setState]=useState(true)
const [id,setId]=useState(null)

console.log(state)

function handleChatDisplay(){
setState((prev)=>!prev)

}

function Inbox({state,setState}){
   return(
  <div className={`${state?'':'hidden'}lg:max-w-[40%] shadow rounded-lg`}>
            {message.map((mes,index)=>(
                  <div key={index} className="flex h-[70px] items-center border-b-2 border-gray-200 gap-x-2 p-2 last:border-none" onClick={()=>{
                     <Chatbox message={mes}   /> ;
                     handleChatDisplay()
                     setId(mes.name)
                  }
               }
                  >
                   <img src={mes.picture}  className="object-cover rounded-full w-[40px] h-[40px]"/>
                     <div className="leading-tight text-gray-600 font-ligh text-sm">
                        <p>{mes.name}</p>
                         <p className="font-bold">{mes.title}</p>
                         <div className="flex items-center gap-x-1">
                           <p>{mes.message[0]}</p>
                           
                           <div className="round-bg-mini w-2 h-2 font-medium text-sm p-2 bg-green-500"   >
                              <span>
                                 {mes.message.length}
                                 </span>
                              </div>
                              
                              </div>
                          
                     </div>
                  </div>
            ))}
            </div>
   )
}


function Chatbox(){

const profile=message.find(profile=>profile.name===id)


if(profile){
   
return(
    <div className={`lg:max-w-[80%] sm:${state?'hidden':""} shadow rounded-lg bg-gray-300 h-[500px] mx-3 lg:w-full`}>
<div className="flex flex-col justify-between h-full ">

   <div>
<div className="flex justify-between bg-white  p-1 items-center border-b-2 border-gray-300">

  
{/* in this place i used the picture of the house but not correct but will change the message pic and the sender picture for the message so it perfect  */}
      
<div onClick={()=>handleChatDisplay()} className='lg:hidden'>
    <FontAwesomeIcon icon={faArrowLeft} className="ml-3 text-lg"/>
</div>


<div className="lg:flex lg:block hidden lg:gap-x-3 items-center">
   
   
   <div onClick={()=>handleChatDisplay()} className="">
    <FontAwesomeIcon 
    icon={faArrowLeft}
     className="ml-3 text-lg" />
</div>

<img 
src={profile.picture} 
className="rounded-full h-[40px] w-[40px] "/>

</div>
    
      

  <div className="flex items-center gap-x-2">
   <img 
   src={profile.picture} 
   className="rounded-full h-[40px] w-[40px] block lg:hidden"/>
   <p className="font-bold">{profile.name}</p>
  
      </div>  
      

   <div className="round-bg-mini p-2 border border-gray-200">
      
      <FontAwesomeIcon 
      icon={faBars} 
      className="text-2xl"/>
      </div>

</div>

<div className="bg-white">
<div className="flex w-full justify-between p-2 lg:w-[80%] mx-auto">

   <div className="flex items-center gap-x-2">

      <img 
      src={profile.picture}
       className="rounded h-[50px] w-[50px]"/>
      
      <div> 
         <p className="font-bold text-sm ">
            {profile.title}
            </p>
       <p className="text-sm text-green-400">
        ₦  {profile.price}
         </p>
         </div>
     

      </div>
   <button className="ml-2 button h-8 gap-x-2 flex items-center self-end">
      <FontAwesomeIcon icon={faPhone} /> 
      contact
      </button></div>
      </div>
 
</div>

<div className="bg-white h-[50px] flex items-center px-2">
   <div className="flex border border-gray-400 rounded-full h-[80%] w-[100%] items-center px-3">
<FontAwesomeIcon 
icon={faSmile}
 className="text-xl text-gray-600 stroke-gray-600 cursor-pointer"/>
<input
 type="text" 
 placeholder="Message" 
 className="p-3 w-full outline-none"
 />

<div className="gap-x-4 flex cursor-pointer">
   <FontAwesomeIcon 
   icon={faPaperclip}  
   className="text-xl text-gray-600 -rotate-45"/>
   <FontAwesomeIcon 
   icon={faCamera}  
   className="text-xl stroke-gray-600 text-white " 
   style={{strokeWidth:50}}/>
   </div>

   </div>
</div>
</div>



            </div>
)

}

}




   return (
      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}>
      <div className="mt-5 lg:px-5 lg:flex grid grid-col-1 ">
         {state?<Inbox 
         state={state} 
         setState={setState} />:''}
       {state?"":<Chatbox/>}
            
           
      </div>
      </motion.div>
   )
}
