import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faBars, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/images/logo/newIcon.png"

import {useNavigate } from "react-router-dom";
import { useState,useRef,useEffect } from "react";

import NavLink from "./navigation-link-component";
import SlideInSidebar from "@/sideBar-component/sidebar-component";
import IsLoginFunction from "./login-homepage";
import {useLoginAuth} from "@/Authentication/Usecontext-logic";
import { Nav } from "./login-homepage";


export default function Default({children}) {
  const [state,setState]=useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const {isLogin}=useLoginAuth()
    console.log(isLogin)
  const node=useRef(null)
  const sideNode=useRef(null)
const navigate=useNavigate('/')




  useEffect(
    ()=>{function handleClick(e){

  if(node.current && !node.current.contains(e.target)){
    setState(false)
  }
  if(sideNode.current && !sideNode.current.contains(e.target)){
    setIsOpen(false)
  }
}
  document.addEventListener('click',handleClick);

  return ()=>document.removeEventListener('click',handleClick)

  
},[]

  )


  function showLogin(reg){
    return(
      

<>
  {
    !isLogin?
    <div className=" absolute  translate-y-[65%]  md:translate-y-[75%] border border-gray-300 bg-white left-[20%] -translate-x-1/2  py-2 w-[150px] md:w-[250px] shadow-sm rounded">
    <div className="flex flex-col gap-y-2 ">
      <NavLink text='User Login' nav='/Login' />
  <NavLink text='House Owner' nav='/HouseOwner' />
  <NavLink text=' List your house' nav='/HouseRegister' />
  <NavLink text=' Sign in' nav='/Register' />
</div>
  </div>
  :
  <div className=" absolute  translate-y-[80%]  md:translate-y-[75%] border border-gray-300 bg-white left-[60%] -translate-x-1/2  py-2 w-[150px] md:w-[250px] shadow-sm rounded">
 <div className="flex flex-col gap-y-2">
  <NavLink text='User Login' nav='/Login' />
  <NavLink text='House Owner' nav='/HouseOwner' />
    <NavLink text='Notification' nav='/HouseOwner' />
      <NavLink text='Settings' nav='/HouseOwner' />
      
    </div>
  </div>
  }
</>

    )
  }
  return (
  
    <div >

    <div className="border-b-2  border-gray-300 sticky top-0 z-99  bg-white pt-2 ">
      <div className={` grid grid-cols-[1fr_1fr_1fr] place-items-center ${isLogin?'gap-12':'gap-16'} w-[90%] mx-auto  `}>
       <div className="  border round-bg p-3 md:p-5 relative" onClick={()=>setIsOpen(!isOpen)}>
  <FontAwesomeIcon icon={faBars} className="sm: h-3 w-3"/>
 <SlideInSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
         </div>
          
         
     
         
        
      
        
           <div className="flex items-end cursor-pointer">
          
       
              <div className="flex items-center " onClick={()=>navigate('/')}>
              
              <img 
               src={logo}
               alt="CM logo"
               className=" w-[9vw]  -mr-2"
               />
             
          <span className="text-[3.5vw] font-Merriweather font-bold ">
            Housing 
            </span>
              </div>
         
        </div>
            
       
       
        <div className="flex items-center space-x-2 pl-5  relative">
        
         
       
         {state && showLogin('true')}
 
 { <IsLoginFunction />}
  <div ref={node} className=" round-bg md:p-5 p-3 group " 
        onClick={()=>setState((prev)=>!prev)}
       
        
          >
          <FontAwesomeIcon icon={faUser} className=" sm: h-3 w-3 " />
        
        </div>

{isLogin?'':<Nav/>}
          
        </div>

       
      </div>
      </div>
      
      {children}

      <div className="max-h-[1000px] bg-black mt-10">
       <h1 className="text-white text-center md:text-[50px] mb-5 animate-fade-in-up hover:scale-105 transition-transform duration-300 ease-in-out">
  Find your dream home
</h1>


       

        
        <div className="grid grid-cols-2  md:grid-cols-3 my-5">
          <div className="w-fit">
          <p className="text-white  my-3 mx-3 ">House types <FontAwesomeIcon icon={faPlus}/></p>
        <div className="grid space-y-3 my-3 mx-3 text-sm font-extralight">
           <a href="" className="text-white hover-me">Self-Contain (Mini Flat)</a>
           <a href="" className="text-white hover-me"> Mini Flat (1-Bedroom)</a>
            <a href="" className="text-white hover-me">2-Bedroom Flat</a>
             <a href="" className="text-white hover-me">3-Bedroom Flat</a>
               <a href="" className="text-white hover-me">Duplex</a>
                 <a href="" className="text-white hover-me">Bungalows</a>
                   <a href="" className="text-white hover-me">Studio Apartments</a>
                     <a href="" className="text-white hover-me">Shared Apartments</a>
        </div>
         </div>
        <div className="w-fit">
          <p className="text-white my-3 mx-3 ">Locations <FontAwesomeIcon icon={faPlus}/></p>
        <div className="grid space-y-3 my-3 mx-3 text-sm font-extralight w-fit">
           <a href="" className="text-white hover-me">Lagos & Highland</a>
           <a href="" className="text-white hover-me">Abuja</a>
            <a href="" className="text-white hover-me">Edo & Benin</a>
             <a href="" className="text-white hover-me">Ogun</a>
               <a href="" className="text-white hover-me">Osun</a>
                 <a href="" className="text-white hover-me">Kano & Kastina</a>
                   <a href="" className="text-white hover-me">Enugu</a>
                     <a href="" className="text-white hover-me">PortHarcoat</a>
        </div>
         </div>
         <div className="w-fit">
          <p className="text-white my-3 mx-3 ">Contact<FontAwesomeIcon icon={faPlus}/></p>
        <div className="grid space-y-3 my-3 mx-3 text-sm font-extralight">
           <a href="mailto:cimessthemanofvalor@gmail.com" className="text-white ">email:cimessthemanofvalor@gmail.com</a>
           <a href="tel:+2349065440424" className="text-white "> Contact us</a>
            <a href="https://www.facebook.com/profile.php?id=100070880838814" className="text-white"> <FontAwesomeIcon icon={faFacebook}/> Facebook</a>
             <a href="https://www.tiktok.com/@aimuanthankgod?lang=en" className="text-white"> <FontAwesomeIcon icon={faTiktok}/> Tiktok</a>
               
        </div>
         </div>
                    
       
</div>
<div className="text-white flex space-x-3 justify-center">
         <a href=""> </a>
         <a href="">  <FontAwesomeIcon icon={faInstagram}/></a>
        <a href="">   <FontAwesomeIcon icon={faTwitter}/></a> 
        </div>
 <p className="text-white text-center mt-5">© 2025 <span className="font-bold text-xl">CM</span>-Housing  Inc.</p>
      </div>
     </div>
    
  );
}
