export default function Input({label,type,add,id,checked,style,styleInput,value,onchange}){



   return(

<div className="text-left">

   {checked?
   <div className={style}>
   <input type={type} id={id} className={styleInput} checked={value} onChange={onchange}/>
   <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center ">{label}<span className="ml-3 text-red-500 pt-1">{add}</span></label>
   </div> 
   :
   <>
   <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center ">{label}<span className="ml-3 text-red-500 pt-1">{add}</span></label>
   <input type={type} id={id} className="border rounded border-gray-300 w-full  focus:outline-none h-10 pl-2"/>
   </>
   }

</div>

   )
}
