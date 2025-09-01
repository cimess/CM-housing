import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'

export default function ImageBox({name,src,icon}){
   return(
  <Swiper
           modules={[Navigation, Autoplay]}
           spaceBetween={30}
           slidesPerView={1}
         navigation={false}
         autoplay={true}
           loop={true}
           speed={1000}
         >
           {src.map((src, idx) => (
          
             <SwiperSlide key={idx}>
               
     <div className="relative h-[300px] w-full flex  justify-start md:h-[400px] group">
              <img src={src[0]} alt="image of kitchen" className={`${'rounded-xl'} object-cover w-full h-full`}/>{icon?
         <button className="button bg-black/60 group-hover:bg-black group-active:bg-black text-white absolute bottom-5 left-5 w-30 flex items-center justify-center space-x-3">
            <FontAwesomeIcon icon={icon}/> <span>{src[1]} </span>
         </button>:''}
        </div>
               
                
             </SwiperSlide>
             
           ))}
         </Swiper> 
   )
}


function handle({name,src,icon}){

    <Swiper
           modules={[Navigation, Pagination, Autoplay]}
           spaceBetween={30}
           slidesPerView={1}
         navigation={1}
           pagination={{ clickable: true }}
           loop={true}
           speed={1000}
         >
           {src.map((src, idx) => (
          
             <SwiperSlide key={idx}>
               
     <div className="relative h-[300px] w-full flex  justify-start md:h-[400px] group">
              <img src={src[0][0]} alt="image of kitchen" className={`${'rounded-xl'} object-cover w-full h-full`}/>{icon?
         <button className="button bg-black/60 group-hover:bg-black group-active:bg-black text-white absolute bottom-5 left-5 w-30 flex items-center justify-center space-x-3">
            <FontAwesomeIcon icon={icon}/> <span>{src[0][1]} </span>
         </button>:''}
        </div>
               
                
             </SwiperSlide>
             
           ))}
         </Swiper> 
}