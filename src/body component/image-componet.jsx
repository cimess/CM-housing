import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImageBox({name,src,icon}){
   return(
   <div className="relative h-[300px] w-full flex  justify-start md:h-[400px] group">
         <img src={src} alt="image of kitchen" className="rounded-xl object-cover w-full h-full"/>
         <button className="button bg-black/60 group-hover:bg-black group-active:bg-black text-white absolute bottom-5 left-5 w-30 flex items-center justify-center space-x-3">
            <FontAwesomeIcon icon={icon}/> <span>{name} </span>
         </button>
        </div>
   )
}