import { useState } from "react";


export default function  useTouchclick(){

   const [hoverl,setHoverl]=useState(false)
    const [hoverr,setHoverr]=useState(false)

   return{
      hoverl,
      hoverr,
      logics:{onPointerDown: ()=>{ setHoverr(true)},
   onPointerUp: ()=> { ; setHoverr(false)},
onPointerLeave:()=> { ; setHoverr(false)}},
   logics2:{onPointerDown: ()=>{ ;setHoverl(true)},
   onPointerUp: ()=> { ; setHoverl(false)},onPointerLeave:()=> { ; setHoverl(false)}}
   }
}