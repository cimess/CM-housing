import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular, faBed,faBath,faDog,faArrowLeft,faArrowRight} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { useState } from "react";
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useTouchclick from "@/logic-component/logic";


export default function Shortlet({image,src,owner,location,pet,bedrooms,bathrooms,description,duration,price,alt}){
  const [state,setState]=useState(false)
 const {hoverr,hoverl,logics,logics2}=useTouchclick()
 
 

    function handleTouchClick(){

setTouch((prev)=>!prev)

  }

  function handleFavoriteClick(){

setState((prev)=>!prev)

  }

   const sliderId=React.useId()
return(
 

   <div className="w-full md:max-w-[300px]">

        
      
      <div className="text-left  sm:w-full ">
       
          
         <div className="w-full   h-[200px] relative mb-3 group" >

           <div className={`custom-prev-${sliderId} absolute left-2 top-1/2 z-10 text-white  p-[15px]  flex rounded-full cursor-pointer  ${hoverl?'bg-black':'bg-black/30'} group-hover:bg-black`} {...logics2}>
  <FontAwesomeIcon icon={faArrowLeft} />
</div>
<div className={`custom-next-${sliderId} absolute right-2 top-1/2 z-10 text-white  p-[15px] rounded-full cursor-pointer flex  ${hoverr?'bg-black':'bg-black/30'} group-hover:bg-black`}{...logics} >
  <FontAwesomeIcon icon={faArrowRight} />
</div>

         <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
      navigation={{
  nextEl: `.custom-next-${sliderId}`,
  prevEl:`.custom-prev-${sliderId}`
}}
        pagination={{ clickable: true }}
        loop={true}
        speed={1000}
      >
        {image.map((src, idx) => (
       
          <SwiperSlide key={idx}>
            
 <div className="  h-[200px] relative mb-3 group hover:cursor-pointer transition-all duration-50000 ease-in-out">
            <img src={src} alt={alt} className="w-full h-full object-cover rounded shadow hover:shadow-md " loading="lazy"/>
            <span className={`absolute top-1 left-1  round-bg p-4 md:p-5 flex justify-center items-center bg-white ${!state &&'group-hover:bg-transparent group-active:bg-transparent' }`}>
<button onClick={()=>handleFavoriteClick()}><FontAwesomeIcon
  icon={faHeartRegular}
  className={`${state?'text-red-500 stroke-red-500':'text-white stroke-black'} group-hover:text-[20px] transition-all duration-300 ease-in-out `}
  style={{ strokeWidth: 60 }}
/></button>
         </span>
         <a href={src} className="absolute -bottom-2.5 left-15 bg-white rounded-full p-1 text-xs group-hover:underline hover:text-red-500 shadow">Enquire For Availability</a>
            </div>
            
             
          </SwiperSlide>
          
        ))}
      </Swiper> 
       
        
         
          </div>
     
      <p className="font-light text-sm ">{location}</p>
      <div className="mb-2 text-lg font-bold font-Merriweather">{owner}</div>
      <div className="mb-3 flex flex-row space-x-3 md:space-x-0 md:flex-col md:space-y-1 ">
<span className="text-sm font-bold">
   <FontAwesomeIcon icon={faBed} className="mr-2"/>
   {bedrooms} Bed
   </span>
   <span className="text-sm font-bold">
  <FontAwesomeIcon icon={faBath} className="mr-2"/>
   {bathrooms} Baths
   </span>
   <span className="text-sm font-bold">
   <FontAwesomeIcon icon={faDog} className="mr-2"/>
   Pet:  {pet}
   </span>
      </div>
      <p className="mb-2 font-extralight text-sm  md:max-w-[300px] ">{description}</p>

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