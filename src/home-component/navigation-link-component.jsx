import { Link } from "react-router-dom"

export default function NavLink({text,nav,style}){
   return(
      <Link className={`hover-bg text-center no-underline ${style}`} to={nav} >
{text}
  </Link>
   )
} 