import {useEffect, useState } from "react";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import {faArrowRight,faCamera,faSearch} from "@fortawesome/free-solid-svg-icons";
import BoxContainer from "./box-container";
import lagosimage from '../assets/images/lagos/lagos.jpg'
import ruralImage from '../assets/images/lagos/iyanaipaja.jpg';
import HouseListing from "@/shortlet/shortlet-house";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Region from "./regionSearch";
import TextSearchFilter from "./searchByText";

function SearchFilter() {
  const { fetchHouses } = useLoginAuth();
  const [regionClick, setRegionClick] = useState(false);
  const [region, setRegion] = useState(null);
  const [houses, setHouses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleRegionSearch(filters) {
    if (!filters) {
      // clear/reset
      setRegion(null);
      setHouses([]);
      setHasSearched(false);
      return;
    }

    setRegion([filters.state, filters.lga, filters.town].filter(Boolean));

    const data = await fetchHouses(filters);
    setHouses(data);
    setHasSearched(true); 
    console.log(data)
  }

  function displaySelectedRegion() {
    return (
      <div>
    {hasSearched?<button onClick={()=>{handleRegionSearch(false)}} className="button">Reset search</button> :<div className="relative font-bold rounded-full shadow-sm w-fit md:w-[50%] bg-gray-300/40 mx-auto h-10 flex items-center justify-center px-4 ">
  {/* Left icon */}
  <FontAwesomeIcon 
    icon={faSearch} 
    className="md:absolute md:left-3 text-gray-600 mr-5" 
  />

  {/* Centered text */}
  <span className="truncate text-gray-500 font-light">
    {region?.length > 0 ? region.join(", ") : "Search"}
  </span>
</div>
}
      </div>
    );
  }

  return (
    <div className="my-10">
      {/* Trigger dropdown */}
      <div className="flex justify-center  w-full">
      <div
        className="py-2 flex-1 min-w-0 relative cursor-pointer  "
        onClick={() => setRegionClick((prev) => !prev)}
      >
        
        <div className="truncate ">{displaySelectedRegion()}</div>
      </div>
</div>
      {regionClick && (
        <Region
          setRegionClick={setRegionClick}
          onSearch={handleRegionSearch}
        />
      )}

      {/* Results */}
      <div className="mt-5">
        {houses.length > 0 ? (
         <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houses.map((house, index) => (
              
   <HouseListing key={index} {...house} />


             
            ))}
          </div>
        ) : hasSearched ? (
          <p className="text-gray-400 italic">No houses yet. Use search.</p>
        ) : null}
      </div>
    </div>
  );
}

function HandleShortLetAndFullLetListing(){
  const [fullLet,setFullLet]=useState(null)
  const [shortLet,setShortLet]=useState(null)
  const {fetchHouses,houseLoading}=useLoginAuth()
  


  useEffect(()=>{
  async function loadHouses(){
const {filteredShortLetHouses,filteredFullLetHouses}=await fetchHouses();
setShortLet(filteredShortLetHouses);
setFullLet(filteredFullLetHouses)
  }
loadHouses()
  },[])
  


  return(
    <div>
      <h1 className="text-left my-5">ShortLet Houses</h1>
 
  <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houseLoading ? (
  <div className="p-5 font-semibold">Loading...</div>
) : shortLet && shortLet.length > 0 ? (
  shortLet.map((house, index) => <HouseListing key={index} {...house} />)
) : (
  <div className="text-gray-400 italic">No houses found</div>
)}

          </div>

          <h1 className="text-center my-7 lg:text-[40px] md:text-[60px]">Full-Let Houses</h1>
 
  <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houseLoading ? (
  <div className="p-5 font-semibold">Loading...</div>
) : fullLet && fullLet.length > 0 ? (
  fullLet.map((house, index) => <HouseListing key={index} {...house} />)
) : (
  <div className="text-gray-400 italic">No houses found</div>
)}

          </div>
    </div>
  )
}


export default  function Body(){
  const { houses,houseLoading,fetchHouses } = useLoginAuth();

   useEffect(()=>{
    if(!houses ||houses.length===0){fetchHouses()}

   },[]) 
  
 
  
   return(
    <div className="px-1 mx-auto text-center transition-all duration-150 ease-in-out  w-full">
         <h2 className="text-[5vw] leading-none my-5  font-Merriweather">
            Find Your Dream Home
         </h2>
         <p className="text-xl text-gray-500 ">Your go-to guide for renting Nigeria’s standout stays</p>
         
 <TextSearchFilter/>

<h1 className="text-left mb-2">Search by Region/State </h1>
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
 <BoxContainer images={ruralImage} href={"www.fb.com"} state="Ogun" city="ota" alt="image of lagos"/>
  <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Bariga" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="lekki" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Edo" city="benin" alt="image of lagos"/>
      <BoxContainer images={lagosimage} href={"www.fb.com"} state="Kano" city="Kastina" alt="image of lagos"/>
   <BoxContainer images={lagosimage} href={"www.fb.com"} state="Lagos" city="Mushin" alt="image of lagos"/>
    <BoxContainer images={ruralImage} href={"www.fb.com"} state="Lagos" city="Dopemu" alt="image of lagos"/>
      </div>
      </div>

 <h1 className="text-left my-5">Top Houses</h1>
 
  <div className="flex flex-wrap  md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houseLoading ? (
  <div className="p-5 font-semibold">Loading...</div>
) : houses && houses.length > 0 ? (
  houses.map((house, index) => <HouseListing key={index} {...house} />)
) : (
  <div className="text-gray-400 italic">No houses found</div>
)}

          </div>
   <HandleShortLetAndFullLetListing/>

      </div>
   )
}