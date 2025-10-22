
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBed,
  faBath,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useLoginAuth } from "@/Authentication/Usecontext-logic";

export default function HouseListing({
  images = [],
  owner,
  location,
  pet,
  bedrooms,
  bathrooms,
  description,
  duration,
  price,
  consultation,
  role,
  alt = "house image",
  _id
}) {

  const sliderId = React.useId();
const {toggleLike,isLogin,likedHouses}=useLoginAuth()
const isLiked =likedHouses.includes(_id)

 function handleLike(){
if(!isLogin){
  alert('Please login to like this property.')
}

toggleLike(_id)
}
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group bg-gray-900  w-full">
      {/* Image carousel */}
      <div className="relative h-56 cursor-pointer">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          navigation={{
            nextEl: `.shortlet-next-${sliderId}`,
            prevEl: `.shortlet-prev-${sliderId}`,
          }}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/house/${_id}`} >
   <img
                src={src}
                alt={alt}
                className="w-full h-56 object-cover "
                loading="lazy"
              />
</Link> 
              {/* dark gradient overlay */}
              <div className="relative inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent " />
              {/* price tag */}
              <div className="absolute bottom-3  translate-x-1  flex items-center justify-between w-[95%] px-3 py-1 rounded-lg ">
  <span className="text-white font-bold text-2xl">₦ {price}</span> 
  <button
    onClick={handleLike}
    className="p-1.5 bg-white/80 hover:bg-white round-bg-mini  h-10 w-10 shadow"
  >
    <FontAwesomeIcon
      icon={faHeart}
      className={isLiked ? "text-red-500 text-2xl" : "text-gray-500"}
    />
  </button>
</div>

            </SwiperSlide>
          ))}
        </Swiper>

        {/* like button */}
        
      </div>

      {/* Content */}
      <div className="p-4 text-white">
        <div className="text-sm text-gray-400 mb-1">{location?.state} {location?.town}</div>
        <h3 className="text-lg font-semibold mb-2">{owner}</h3>
        <div className="flex items-center gap-4 text-sm mb-3 text-gray-300 justify-center">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faBed} className="mr-1 text-gray-400" />{" "}
            {bedrooms} Bed
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faBath} className="mr-1 text-gray-400" />{" "}
            {bathrooms} Bath
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faDog} className="mr-1 text-gray-400" /> Pet:{" "}
            {pet}
          </span>
        </div>
        <p className="text-gray-300 line-clamp-2 font-light text-sm">{description}</p>

        <div className="mt-3 text-sm text-gray-400 text-">
          <div className="text-gray-400"> Duration:  <span className="text-white">{duration}</span></div>
          <div className="text-gray-400"> HousingProvider:  <span className="text-white">{role}</span></div>
          {role==='agent'?<div className="text-gray-400"> consultation-fee:  <span className="text-white">{consultation}</span></div>:''}
        </div>
      </div>
    </div>
  );
}



