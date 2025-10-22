import {useEffect, useState ,useRef} from "react";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import {faArrowRight,faCamera,faSearch} from "@fortawesome/free-solid-svg-icons";
import BoxContainer from "./box-container";
import lagosimage from '../assets/images/lagos/lagos.jpg'
import ruralImage from '../assets/images/lagos/iyanaipaja.jpg';
import HouseListing from "@/shortlet/shortlet-house";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Region from "./regionSearch";
import TextSearchFilter from "./searchByText";
import { Switch } from "@/components/ui/Switch";


function HandleShortLetAndFullLetListing(){

  const {fullLet,shortLet,houseLoading,fetchHouses,houses,hasMore}=useLoginAuth()
  console.log(hasMore,"this is hasMore")

  const loadMoreAll=useRef(null)
   const loadMoreShortLet=useRef(null)
    const loadMoreFullLet=useRef(null)
     const newestRef=useRef(null)



      const [showHouse,setShowHouse]=useState(false)

  useEffect(()=>{
  async function loadHouses(){

if((!fullLet || fullLet .length===0) && (!shortLet || shortLet.length===0)&& (!houses || houses.length===0)){
 await fetchHouses({type:'shortLet',filters:{filter:'shortLet'}});
  await fetchHouses({type:'fullLet',filters:{filter:'fullLet'}})
  await fetchHouses()
}
  }
loadHouses()
  },[])
  
useEffect(()=>{

function createObserver(ref,type,filter){

if(!ref.current)return;
const observer= new IntersectionObserver(
  async(entries)=>{
    const entry=entries[0];
    if(!entry.isIntersecting || houseLoading)return;

    // guard against overfecting 
    if(!hasMore?.[type]){
      observer.unobserve(ref.current);
      return;
    }
    await fetchHouses({type, append:true, filters:filter});
  },{threshold:1.0}
);
observer.observe(ref.current)
return observer;

}

const obsAll=createObserver(loadMoreAll,"all",{});
const obsShort = createObserver(loadMoreShortLet, "shortLet", { filter: "shortLet" });
  const obsFull = createObserver(loadMoreFullLet, "fullLet", { filter: "fullLet" });

  return ()=>{
    if(obsAll)obsAll.disconnect();
    if(obsShort)obsShort.disconnect();
    if(obsFull)obsFull.disconnect()
  }
},[houseLoading,hasMore])




 const houseType=showHouse?fullLet:shortLet

function changeHouseButton(){
setShowHouse((prev)=>!prev)

}

  return( <div>

<div className="md:flex justify-between items-center  text-left"><div className="flex justify-left items-center gap-x-3 text-xl mt-3"><span className="text-base text-gray-400">View by</span>
  <span className="text-gray-600">Short-Let</span>
  <Switch checked={showHouse} onCheckedChange={changeHouseButton} className="md:h-6 md:w-12"/>
  <span className="text-gray-600">Full-Let</span></div>   <button onClick={()=>newestRef.current?.scrollIntoView({behavior:"smooth"})} className="button md:justify-self-right sm:mt-5">Recent Listing</button></div>


      <h1 className="md:text-center my-7 text-left md:text-[40px]">{showHouse?"Full-Let":'Short-Let'} Houses</h1>
 
  <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houseType ?  houseType && houseType.length > 0 ? (
  houseType.map((house, index) => {return <><HouseListing key={index} {...house} />

          
     </>})
) : (
  <div className="text-gray-400 italic">No houses found</div>
):(
  <div className="p-5 font-semibold">Loading...</div>
)}
{<div ref={showHouse?loadMoreFullLet:loadMoreShortLet} className="text-center">{(houseLoading&&(showHouse?hasMore.fullLet:hasMore.shortLet))&&<span>Loading more.....</span>}</div>}
          </div>



 <h1 className="text-left my-5" ref={newestRef}>Recent Listed Houses</h1>
 
  <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houses.map((house, index) => (
  <>
    <HouseListing key={index} {...house} />
    
  </>
))
}
{<div ref={loadMoreAll} className="text-center">{(houseLoading&&hasMore.all)&&<span>Loading more.....</span>}</div>}
</div>
</div>
)
}




export default  function Body(){

  
 
  
   return(
    <div className="px-1 mx-auto text-center transition-all duration-150 ease-in-out  w-[98%]">
         <h2 className="text-[5vw] leading-none my-5  font-Merriweather">
            Find Your Dream Home
         </h2>
         <p className="text-xl text-gray-500 ">Your go-to guide for renting Nigeria’s standout stays</p>
         
 <TextSearchFilter/>

<h1 className="text-left mb-2">Search by Region/State </h1>

<h1 className="text-left mb-2">
         Popular cities
      </h1>
      <p className="text-left text-lg font-thin flex justify-between items-center ">
        Explore houses around you <FontAwesomeIcon icon={faArrowRight} className="text-2xl"/>
      </p>
      <div className="overflow-x-auto scrollbar-hide">
<div className="grid grid-flow-col auto-cols-max gap-x-3">
 <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Ajah" alt="image of lagos"/>
 <BoxContainer images={ruralImage} href={"www.fb.com"} state="Ogun" city="ota" alt="image of lagos"/>
  <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Bariga" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="lekki" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Edo" city="benin" alt="image of lagos"/>
      <BoxContainer images={lagosimage} href={"www.fb.com"} state="Kano" city="Kastina" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Mushin" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="Dopemu" alt="image of lagos"/>
     <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="ipaja" alt="image of lagos"/>
      <BoxContainer images={ruralImage} href={"www.fb.com"} state="Ogun" city="ota" alt="image of lagos"/>
      </div>
      </div>


   <HandleShortLetAndFullLetListing/>

      </div>
   )
}