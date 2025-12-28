import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox,faBell,faBoxArchive,faClipboardList} from "@fortawesome/free-solid-svg-icons"
import { Link,useNavigate } from "react-router-dom"
import {useState } from "react"
import { useLoginAuth } from "@/Authentication/Usecontext-logic"

function HoverMessage({text}){

   return(
      <p className=" hidden rounded group-hover:block bg-popover p-2 absolute translate-y-10 translate-x-2 text-popover-foreground  whitespace-nowrap text-xs shadow-md border border-border">
         {text}
      </p>
   )
}

export default function IsLoginFunction({notifications}){

const [notification,setNotification]=useState(0)
const {isLogin}=useLoginAuth()
  const Navigate=useNavigate()
if(!isLogin) return null



   function NotificationHolder(){
   return(
      <div>{notification>0?  <div className="round-bg group-hover:bg-red-600 bg-red-600 p-[7px] absolute translate-y-3 translate-x-2 text-[10px] "><p className="">{notification}</p></div>:''
   }</div>

   )
}

   return(

      <div className='flex gap-x-1'>
<div className="round-bg p-3 md:p-5 relative group" onClick={()=>Navigate('/MyMessagePage')}>
<FontAwesomeIcon className="sm:h-3 w-3"
icon={faInbox}/>
<NotificationHolder/>
<HoverMessage text='My messages' />
</div>

<div className="round-bg p-3 md:p-5 relative group"
onClick={()=>Navigate('/MyAdvertComponent')}>
<FontAwesomeIcon className="sm:h-3 w-3"
icon={faBoxArchive}/>
<NotificationHolder/>
<HoverMessage text='My Advert' />
</div>
<div className="round-bg p-3 md:p-5 relative group">
<FontAwesomeIcon className="sm:h-3 w-3"
icon={faClipboardList}/>
<NotificationHolder/>
<HoverMessage text='liked houses' />
</div>
      </div>

   )
}


export function Nav(){
 const {isLogin}=useLoginAuth()
   return(
 <div className="flex gap-x-2">{isLogin?
     <Link to="/HouseRegister" className="button rounded-full hidden py-2  text-center whitespace-nowrap hover:no-underline md:block">
              List your house
            </Link>:
      <div className="flex"> <Link to="/register" className="hidden text-center md:hover:bg-primary md:py-2 md:pl-3  rounded-full md:hover:text-primary-foreground whitespace-nowrap md:block hover:no-underline font-bold transition-colors">Sign Up</Link>
       <Link to="/Login" className="text-center md:hover:bg-primary  md:py-2 md:px-3  rounded-full md:hover:text-primary-foreground whitespace-nowrap hover:no-underline transition-colors">Login</Link>
     </div> }

      </div>
   )
}
