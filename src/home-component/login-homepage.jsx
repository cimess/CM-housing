import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox,faBell,faBoxArchive,faClipboardList} from "@fortawesome/free-solid-svg-icons"
import { Link,useNavigate } from "react-router-dom"
import {useState } from "react"
import { useLoginAuth } from "@/Authentication/Usecontext-logic"


function HoverMessage({text}){



   return(
      <p className=" hidden rounded group-hover:block bg-black p-2 absolute translate-y-10 translate-x-2 text-white  whitespace-nowrap text-xs">
         {text}
      </p>
   )
}

export default function IsLoginFunction({notifications}){

const [notification,setNotification]=useState(0)
const {isLogin}=useLoginAuth()

   const Navigate=useNavigate('/')


   function NotificationHolder(){
   return(
      <div>{notification>0?  <div className="round-bg hover:bg-red-600 bg-red-600 p-[7px] absolute translate-y-3 translate-x-2 text-[10px] "><p className="">{notification}</p></div>:''
   }</div>
    
   )
}


   return(

   
      
      
      <div className={`flex gap-x-1 ${isLogin?"":'hidden'}`}>
<div to='/Login' className="round-bg p-3 md:p-5 relative group" onClick={()=>Navigate('/MyMessagePage')}>
<FontAwesomeIcon className="sm:h-3 w-3" icon={faInbox}/>
<NotificationHolder/>
<HoverMessage text='My messages' />
</div>

<div to='/Login' className="round-bg p-3 md:p-5 relative group">
<FontAwesomeIcon className="sm:h-3 w-3" icon={faBoxArchive}/>
<NotificationHolder/>
<HoverMessage text='My Advert' />
</div>
<div to='/Login' className="round-bg p-3 md:p-5 relative group">
<FontAwesomeIcon className="sm:h-3 w-3" icon={faClipboardList}/>
<NotificationHolder/>
<HoverMessage text='liked houses' />
</div>
      </div>
   
      
     
   

   )
}


export function Nav(){
   return(
 <div className="flex gap-x-2">
       <Link to="/Login" className="hidden text-center md:hover:bg-black py-2 px-3  rounded-full md:hover:text-white whitespace-nowrap md:block hover:no-underline ">Log in</Link>
 
            <Link to="/HouseRegister" className="button rounded-full hidden py-2  text-center whitespace-nowrap hover:no-underline md:block">
              List your house
            </Link>
      </div>
   )
}

