
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCalendarDays,faComments, faChartLine, faGem,  faLocationDot, faBed, faBathtub, faDog, faBars, faGear, faMoon, } from "@fortawesome/free-solid-svg-icons"
import SlideInSidebar from "@/sideBar-component/sidebar-component";
import {message} from '@/data/messageBox'

import { useState } from "react";
import Settings from "./settings";


 export default function MyadvertComponent(){


  const [state,setState]=useState(0)

  function handleAdvertState(value){

    setState(value)
  }

function HandleDisplayComponent({state}){

switch(state){
  case 1 :
    return(
    <ClientAdvert/>
    )
     case 2:
      return(
        <Feedback/>
      )
      case 3:
        return(
          <Performance/>
        )
        case 4:
          return(
            <Settings/>
          )
          case 5:
            return(
              <div className= "self-center mx-auto"><Darkmode/></div>
              
            )
    default: return(<h1 className= "self-center mx-auto " >Nothing to display</h1>)
    
}

}


 return(
<div className="flex ">
  <div className="w-[30%] lg:w-[50%] ">
    <main  className="shadow rounded-lg h-[500px] py-4 ">

      <div className="flex items-center flex-col ">
<img src={message[0].picture} className=" rounded-full h-20 w-20 lg:w-32 lg:h-32 mb-4"/>
<p className=" text-xl lg:text-2xl">{message[0].name}</p>
<p className="sm:text-sm text-gray-600  ">{message[0].email}</p>
      </div>


  <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer mt-10 hover-bg items-center'
  onClick={()=>handleAdvertState(1)}>
         <FontAwesomeIcon 
       icon={faCalendarDays} 
       className="text-lg"/>
     <p className="">My advert</p>  
     </div>


     <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg'
     onClick={()=>handleAdvertState(2)}>
        <FontAwesomeIcon 
       icon={faComments} 
       className="text-lg"/>
     <p className="">Feedback</p>  
     </div>

     <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg' 
     onClick={()=>handleAdvertState(3)}
     >
          <FontAwesomeIcon 
       icon={faChartLine} 
       className="text-lg"/>
     <p className="">Performance</p>  
     </div>

<div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg items-center'
 onClick={()=>handleAdvertState(4)}>
          <FontAwesomeIcon 
       icon={faGear} 
       className="text-lg"/>
     <p className="">Settings</p>  
     </div>
      <div className='flex py-3 gap-x-3 px-2 border-b-1 cursor-pointer hover-bg items-center' 
     onClick={()=>handleAdvertState(5)}
     >
          <FontAwesomeIcon 
       icon={faMoon} 
       className="text-lg"/>
     <p className="">Darkmode</p>  
     </div>
    </main>
  </div>


  <HandleDisplayComponent state={state}/>
  
    
 
             </div>
 )
 
 
}

function ClientAdvert(){
  return(
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
  )
}

function Feedback(){
    return(
     <div className={` h-[500px] mx-3  `}>
   
 <div className="flex flex-col  h-full ">
 

 <div className="grid lg:grid-cols-2 w-full h-full gap-2  overflow-y-scroll  ">
 {message.map((advert,index)=>(
  <div key={index} 
  className="h-[400px] border-1  flex flex-col my-2 rounded shadow p-4 pt-20">
   
    <div className="px-1 py-2 flex flex-col gap-y-8">

<div>
 

    <div className="flex items-center gap-x-2 mb-2">
      <img src={advert.picture} 
    className=" h-10 w-10 rounded-full "/>
    
     <h1>
         {advert.name}
    </h1>
    </div> 
        <p className="text-gray-600 text-sm">"
  {advert.feedback}"</p>
</div>

<div className="flex">
  
    <h1>
      5.0 rating 
    </h1>
     

             
        </div>  

 <h2 className="font-light text-sm "><FontAwesomeIcon icon={faLocationDot}/> {advert.title}</h2>



</div>

  </div>
 ))}
 </div>

 
 

 </div>
 
 </div>
  )
}

function Performance(){
    return(
     <div className={` h-[500px] mx-3  shadow w-full`}>
   
<h2 className="text-xl text-center mt-3 border-b font-semibold">
  Performance
</h2>

<div className="p-2 flex flex-wrap  ">
  <button className="box mx-1 bg-black/80 text-white ">visitors<p className="text-xl font-bold">{1}</p></button>  
   <button className="box mx-1 bg-black/80 text-white">chat request<p className="text-xl font-bold">{1}</p></button>
  
  <button className="box mx-1 bg-black/80 text-white">followers<p className="text-xl font-bold">{1}</p></button>  
   
  <button className="box mx-1 bg-black/80 text-white">feedback<p className="text-xl font-bold">{1}</p></button>
    <button className="box mx-1 bg-black/80 text-white">likes<p className="text-xl font-bold">{1}</p></button> 
</div>
 
 </div>
  )
}

function Darkmode(){
  return(
    <h1>
      COMING SOON
    </h1>
  )
}


