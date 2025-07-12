import {Label} from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import image from '../assets/images/my-banners/banner.jpg'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ImageBox from "./image-componet";
import BoxContainer from "./box-container";
import lagosimage from '../assets/images/lagos/lagos.jpg'
import ruralImage from '../assets/images/lagos/iyanaipaja.jpg';
import HandleImageLoading from "./handleImageListing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SearchFilter(){
   return(
      <div className="my-10 ">
         <div className="mb-4 ">
             <Label >
         <span className=" text-base md:text-[2vw] " >Short-Let</span><Switch  /> <span className=" font-bold text-base md:text-[2vw]">Full-Let</span>
        </Label>
         </div>
         <div className=" mb-7">
             <form action="" className="grid md:grid-cols-[2fr_1fr] ">
                <div className="flex flex-row gap-x-3 box text-left px-3 w-full max-w-full">
       
        <div className="py-2 flex-1 min-w-0">
            <label htmlFor="text" className="block text-sm ">Region </label>
           <input type="text" placeholder="input region" id="text" className="placeholder:text-sm w-full"/>
         </div>

          <div className="border-l border-gray-400 pl-3 py-2 flex-1 min-w-0">
            <label htmlFor="date" className="block text-sm">Let Period</label>
           <input type="date" placeholder="" id="date" className="text-sm text-gray-400 w-full"/>
         </div>
        
         </div>
       <div className="ml-3 flex justify-center md:justify-start items-center "> <button type="submit" className="button"> search</button></div>
             </form>
         </div>
                 
        <ImageBox src={image} name="Ajah" icon={faCamera}/>
            </div>

           
   )
}

export default function Body(){
   return(
    <div className="px-5 mx-auto text-center transistion-all duration-150 ease-in-out">
         <h2 className="text-[5vw] leading-none my-5  font-Merriweather">
            Find Your Dream Home
         </h2>
         <p className="text-xl text-gray-500 ">Your go-to guide for renting Nigeria’s standout stays</p>
<SearchFilter/>
<h1 className="text-left mb-2">
         Popular cities
      </h1>
      <p className="text-left text-lg font-thin flex justify-between items-center ">
        Explore houses around you <FontAwesomeIcon icon={faArrowRight} className="text-2xl"/>
      </p>
      <div className="overflow-x-auto scrollbar-hide">
<div className="grid grid-flow-col auto-cols-max gap-x-3">
 <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Ajah" alt="image of lagos"/>
 <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="Ipaja" alt="image of lagos"/>
  <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Bariga" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Fatade" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="Dopemu" alt="image of lagos"/>
      <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Bariga" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Fatade" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="Dopemu" alt="image of lagos"/>
      </div>
      </div>

 <h1 className="text-left my-5">Top <a href="" className="">short-let Houses</a></h1>
 <HandleImageLoading/>
   


      </div>
   )
}