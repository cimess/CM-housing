



export default function BoxContainer({images,state,city,href,alt}){
   return(
      <div className=" group w-fit  my-3">
         <button className="text-left">
            <div className="w-[180px] h-[150px] mb-1 md:w-[200px] h-[150px]">
            <img src={images} alt={alt} className="w-full h-full object-cover rounded-lg cursor-pointer"/>
         </div>
         <a href={href} className="font-bold  group-hover:underline pl-1">{state}, {city}</a>
         </button>
         
      </div>
      
   )

}