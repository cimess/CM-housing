import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faBars, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/images/logo/newIcon.png"

import { Link, useNavigate } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import Body from "@/body component/homeBody";


export default function Default({children}) {
  const [state,setState]=useState(false)
  const node=useRef(null)
const navigate=useNavigate('/')

  useEffect(
    ()=>{function handleClick(e){

  if(node.current && !node.current.contains(e.target)){
    setState(false)
  }
}
  document.addEventListener('click',handleClick);

  return ()=>document.removeEventListener('click',handleClick)

  
},[]

  )

  function showLogin(reg){
    return(
      

<div className=" absolute  translate-y-[65%]  md:translate-y-[75%] border border-gray-300 bg-white left-[20%] -translate-x-1/2  py-2 w-[150px] md:w-[250px] shadow-sm rounded">
  {
    reg?
    <div className="flex flex-col gap-y-2 ">
  <Link className="hover-bg text-center no-underline" to='/Login' >
  User Login
  </Link>
  <Link className="hover-bg text-center no-underline" to='/HouseOwner' >
  House owner
  </Link>
  <Link className="hover-bg text-center no-underline" to='/HouseRegister'>
  List your house
  </Link>
  <Link className="hover-bg text-center no-underline" to='/Register'>
  Sign in
  </Link>
  </div>
  :
 <div className="flex flex-col gap-y-2">
  <Link className="hover-bg text-center no-underline" to='/Login' >
  User Login
  </Link>
  <Link className="hover-bg text-center no-underline" to='/HouseOwner' >
  House owner
  </Link>
    </div>
  
  }
</div>

    )
  }
  return (
  
    <div >

    <div className="border-b-2  border-gray-300 sticky top-0 z-99  bg-white pt-2 ">
      <div className="  grid grid-cols-[1fr_1fr_1fr] place-items-center gap-16 w-[90%] mx-auto  ">
      <div className="  border round-bg p-3 md:p-5  border-gray-300 flex items-center justify-center cursor-pointer hover:bg-black  hover:text-white" >
  <FontAwesomeIcon icon={faBars} className="sm: h-3 w-3"/>
         </div>
         
        
      
        
           <div className="flex items-end cursor-pointer">
          
       
              <div className="flex items-center" onClick={()=>navigate('/')}>
 <span className="text-[6vw] font-Merriweather ">
            CM
            </span>
             <span className="w-7 h-7  ">
              <img 
               src={logo}
               alt="CM logo"
               className="w-full h-full object-contain "
               />
              </span>
          <span className="text-[3.5vw] font-Merriweather font-bold ">
            Housing 
            </span>
              </div>
         
        </div>
            
       
       
        <div className="flex items-center space-x-5 pl-5  relative">
        
         
        <div ref={node} className=" round-bg md:p-5 p-3  border border-gray-300 flex justify-center items-center cursor-pointer group hover:bg-black hover:text-white" 
        onClick={()=>setState((prev)=>!prev)}
       
        
          >
          <FontAwesomeIcon icon={faUser} className=" sm: h-3 w-3 " />
        
        </div>
         {state && showLogin('true')}
 
 <Link to="/Login" className="hidden text-center md:hover:bg-black py-2 px-3  rounded-full md:hover:text-white whitespace-nowrap md:block hover:no-underline ">Log in</Link>
 
            <Link to="/HouseRegister" className="button rounded-full hidden py-2  text-center whitespace-nowrap hover:no-underline md:block">
              List your house
            </Link>


          
        </div>

       
      </div>
      </div>
      {children}

      <div className="max-h-[1000px] bg-black mt-10">
        <h1 className="text-white text-center mb-5 md:text-[50px] mb-5">
          Find your dream home
        </h1>

       

        
        <div className="grid grid-cols-2  md:grid-cols-3 my-5">
          <div className="w-fit">
          <p className="text-white hover-me my-3 mx-3 ">House types <FontAwesomeIcon icon={faPlus}/></p>
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
          <p className="text-white hover-me my-3 mx-3 ">Locations <FontAwesomeIcon icon={faPlus}/></p>
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
          <p className="text-white hover-me my-3 mx-3 ">Contact<FontAwesomeIcon icon={faPlus}/></p>
        <div className="grid space-y-3 my-3 mx-3 text-sm font-extralight">
           <a href="mailto:cimessthemanofvalor@gmail.com" className="text-white hover-me">email: cimessthemanofvalor@gmail.com</a>
           <a href="tel:+2349065440424" className="text-white hover-me"> Contact us</a>
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
