
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCalendarDays,faComments, faChartLine, faGem,  faLocationDot, faBed, faBathtub, faDog, faBars, faGear, } from "@fortawesome/free-solid-svg-icons"
import SlideInSidebar from "@/sideBar-component/sidebar-component";
import {message} from '@/data/messageBox'




 export default function MyadvertComponent(){

 return(
<div className="flex ">
  <div className="w-[30%] lg:w-[50%] ">
    <main  className="shadow rounded-lg h-[500px] py-4 ">

      <div className="flex items-center flex-col ">
<img src={message[0].picture} className=" rounded-full h-20 w-20 lg:w-32 lg:h-32 mb-4"/>
<p className=" text-xl lg:text-2xl">{message[0].name}</p>
<p className="sm:text-sm text-gray-600  ">{message[0].email}</p>
      </div>


  <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer mt-10 hover-bg'>
         <FontAwesomeIcon 
       icon={faCalendarDays} 
       className="text-lg"/>
     <p className="">My advert</p>  
     </div>


     <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg'>
        <FontAwesomeIcon 
       icon={faComments} 
       className="text-lg"/>
     <p className="">Feedback</p>  
     </div>

     <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg'>
          <FontAwesomeIcon 
       icon={faChartLine} 
       className="text-lg"/>
     <p className="">Performance</p>  
     </div>

<div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg'>
          <FontAwesomeIcon 
       icon={faGear} 
       className="text-lg"/>
     <p className="">Settings</p>  
     </div>
    </main>
  </div>

     <div className={` h-[500px] mx-3  `}>
   
 <div className="flex flex-col  h-full ">
 

 <div className="grid lg:grid-cols-2 w-full h-full gap-2  overflow-y-scroll  ">
 {message.map((advert,index)=>(
  <div key={index} 
  className="h-[400px] border-1  flex flex-col my-2 rounded shadow ">
    <div className="h-[200px] w-[100%]">

    <img src={advert.picture} 
    className="object-cover h-full w-full"/>
    </div>
    <div className="px-1 py-2">

<h2 className="text-xl font-bold">{advert.title}</h2>

      <div>
        <FontAwesomeIcon icon={faLocationDot}/> {advert.location}
        </div>
      <p > price:
        <span className="text-gray-600 ">₦ {advert.price}</span>
         </p>
  <div className="flex gap-x-4">
       <p> <FontAwesomeIcon icon={faBed}/> {advert.bedrooms} </p>     <p><FontAwesomeIcon icon={faBathtub}/> {advert.bathrooms}</p>      <p><FontAwesomeIcon icon={faDog}/> {advert.pet}</p>     
        </div>       

<p className="text-gray-600 text-sm">
  {advert.description}</p>


</div>

  </div>
 ))}
 </div>

 
 

 </div>
 
 </div>
 
             </div>
 )
 
 
}