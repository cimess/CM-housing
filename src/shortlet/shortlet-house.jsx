import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular, faBed,faBath,faDog} from "@fortawesome/free-solid-svg-icons"


export default function Shortlet({image,src,owner,location,pet,bedrooms,bathrooms,description,duration,price,alt}){
return(
   <div className="flex-1 min-w-[200px]">
      <div className="text-left w-[200px]">
         <div className="w-[200px] h-[200px] relative mb-3 group">
 <img src={image} alt={alt} className="w-full h-full object-cover rounded shadow hover:shadow-lg "/>
        
        
         <span className="absolute top-1 left-1  round-bg p-4 md:p-5 flex justify-center items-center bg-white group-hover:bg-transparent group-active:bg-transparent">
<button><FontAwesomeIcon
  icon={faHeartRegular}
  className="text-white stroke-black"
  style={{ strokeWidth: 60 }}
/></button>
         </span>
         <a href={src} className="absolute -bottom-2.5 left-5 bg-white rounded-full p-1 text-xs group-hover:underline hover:text-red-500 shadow">Enquire For Availability</a>
          </div>
     
      <p className="font-extralight text-sm mb-3">{location}</p>
      <div className="mb-3 text-lg font-bold font-Merriweather">{owner}</div>
      <div className="mb-3 flex flex-col space-y-1 ">
<span >
   <FontAwesomeIcon icon={faBed} className="mr-2"/>
   {bedrooms} Bedrooms
   </span>
   <span>
  <FontAwesomeIcon icon={faBath} className="mr-2"/>
   {bathrooms} Bathsrooms
   </span>
   <span>
   <FontAwesomeIcon icon={faDog} className="mr-2"/>
   Pet-friendly:  {pet}
   </span>
      </div>
      <p className="mb-3 font-extralight text-sm">{description}</p>

      <div className="mb-3 ">
<div>
   <span >Price: </span>
   <span className="text-gray-500">₦ {price}</span>
   </div>
<div>
   <span>Duration:</span>
   <span> {duration} Month</span>
   </div>

      </div>
       </div>
   </div>
   
)
}