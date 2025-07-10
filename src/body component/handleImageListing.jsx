
import { Listing } from "@/assets/exportImagesInGroup"
import Shortlet from "@/shortlet/shortlet-house"

export default function HandleImageLoading(){
return(
  
<div className="flex flex-wrap space-x-1 space-y-5">
      {Listing.map((im,index)=>{

         console.log(im);
         return(
<Shortlet key={index} {...im} />
         )
   })}

   </div>
 
   
   
)
}