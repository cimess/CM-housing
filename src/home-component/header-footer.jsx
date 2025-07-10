import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo/newIcon.png"

export default function Default({children}) {
  return (
  
    <div>

    <div className="border-b-2">
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
 
 <a href="" className="hidden md:inline-block w-[50px]">Log in</a>
            <button className="button rounded-full hidden w-[150px] md:inline-block">
              List your house
            </button>
          
        </div>

       
      </div>
      </div>
      {children}
     </div>
    
  );
}
