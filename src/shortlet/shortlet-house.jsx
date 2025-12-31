
import { Link } from "react-router-dom";
import { toast } from "sonner";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Hover animation for the card
      const card = cardRef.current;
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());

      // Entrance animation
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

    }, cardRef);

    return () => ctx.revert();
  }, []);

 function handleLike(){
if(!isLogin){
  toast.error('Please login to like this property.');
  return;
}

toggleLike(_id)
}
  return (
    <div ref={cardRef} className="relative rounded-xl overflow-hidden shadow-lg group bg-card text-card-foreground w-full border border-border transition-colors duration-300">
      {/* Image carousel */}
      <div className="relative h-64 cursor-pointer overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={images.length > 1}
          autoplay={{ delay: 5000 }}
          navigation={images.length > 1 ? {
            nextEl: `.shortlet-next-${sliderId}`,
            prevEl: `.shortlet-prev-${sliderId}`,
          } : false}
          className="h-full"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/house/${_id}`} >
   <img
                src={src}
                alt={alt}
                className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
</Link>
              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* price tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-primary font-bold text-xl">₦ {price}</span>
                </div>
                <button
                  onClick={handleLike}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-primary/90 rounded-full transition-all duration-300 group-hover:scale-110 border border-white/20"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={isLiked ? "text-red-500 text-lg" : "text-white text-lg"}
                  />
                </button>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-card-foreground line-clamp-1">{owner}</h3>
            <div className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">{role}</div>
        </div>

        <div className="text-sm text-muted-foreground mb-4 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            {location?.state}, {location?.town}
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-border border-b mb-4">
          <div className="flex flex-col items-center justify-center text-center">
            <FontAwesomeIcon icon={faBed} className="text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-border border-r">
            <FontAwesomeIcon icon={faBath} className="text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <FontAwesomeIcon icon={faDog} className="text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{pet}</span>
          </div>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm mb-4 font-light leading-relaxed">{description}</p>

        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
          <div>Duration: <span className="text-foreground font-medium">{duration}</span></div>
          {role==='agent' && <div>Fee: <span className="text-foreground font-medium">{consultation}</span></div>}
        </div>
      </div>
    </div>
  );
}



