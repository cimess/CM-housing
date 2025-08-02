  import Input from "./input-component";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
 

  
  export default function Region({setRegionClick, regionDropdown,handleRegionDropdown}){



   


    return  (
         <div className="flex items-start justify-between absolute translate-y-[80px] left-2   z-98 w-[50%]">
            <div className=" border border-gray-300 bg-white w-full rounded pl-2 shadow">
               <Input id='Lagos' 
               type='checkbox' 
               label='Lagos State'
                checked='yes'  
                 style={'flex gap-x-2 items-center accent-black'} styleInput='h-5 w-5' 
                  value={regionDropdown.lagos} 
                  onchange={(e)=>handleRegionDropdown(e)}  
                  />

<Input id='Ogun' 
type='checkbox' 
label='Ogun state'
 checked='yes' 
   style={'flex gap-x-2 items-center accent-black'}
    styleInput='h-5 w-5' 
     value={regionDropdown.ogun}
      onchange={handleRegionDropdown}
        />

<Input id='Osun'
 type='checkbox'
  label='Osun state'
   checked='yes' 
     style={'flex gap-x-2 items-center accent-black'}
      styleInput='h-5 w-5'
        value={regionDropdown.osun}
         onchange={(e)=>handleRegionDropdown(e)} 
           />

<Input id='Edo'
 type='checkbox'
  label='Edo state'
   checked='yes' 
     style={'flex gap-x-2 items-center accent-black'} 
     styleInput='h-5 w-5' 
      value={regionDropdown.edo}
       onchange={(e)=>handleRegionDropdown(e)}
          />

<Input id='Ekiti'
 type='checkbox' 
 label='Kwara state'
  checked='yes'  
   style={'flex gap-x-2 items-center accent-black'}
    styleInput='h-5 w-5'  
    value={regionDropdown.kwara}
     onchange={(e)=>handleRegionDropdown(e)}
        />


<Input id='Oyo' 
type='checkbox'
 label='Oyo state'
  checked='yes'  
   style={'flex gap-x-2 items-center accent-black'} 
   styleInput='h-5 w-5' 
    value={regionDropdown.oyo}
     onchange={(e)=>handleRegionDropdown(e)}
        />


<Input 
id='Abuja' 
type='checkbox' 
label='Abuja state'
 checked='yes'  
  style={'flex gap-x-2 items-center accent-black'} 
  styleInput='h-5 w-5' 
   value={regionDropdown.abuja} 
   onchange={(e)=>handleRegionDropdown(e)}
      />


</div>

 <button className="-ml-4 -mt-1"
  onClick={(e)=>{  setRegionClick(false)}}>
   <FontAwesomeIcon 
   icon={faXmarkCircle}
   className="text-xl hover:text-red-600 "/>
 </button>

         </div>
      )

   }