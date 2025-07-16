import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faBars, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/images/logo/newIcon.png"

import { Link } from "react-router-dom";



export default function Default({children}) {
  return (
  
    <div>

    <div className="border-b-2 border-gray-300 sticky top-0 z-99  bg-white">
      <div className="  grid grid-cols-[1fr_1fr_1fr] gap-16 w-[90%] mx-auto my-3 ">
     <button> <div className="  border round-bg p-3 md:p-5  border-gray-300 flex items-center justify-center">
  <FontAwesomeIcon icon={faBars} className="sm: h-3 w-3"/>
         </div>
         </button>
        
      
        <button>
           <div className="flex items-end">
          
       
              <div className="flex items-center">
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
          </button>   
       
       
        <div className="flex items-center space-x-5 pl-5">
          <button>
        <div className=" round-bg md:p-5 p-3  border border-gray-300 flex justify-center items-center">
          <FontAwesomeIcon icon={faUser} className=" sm: h-3 w-3" />
        </div>
       </button>
 
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
