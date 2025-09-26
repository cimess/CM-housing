import { Link } from "react-router-dom"

export default function NavLink({text,nav,style,onClick}){
   return(
      <Link 
      className={`hover-bg text-center no-underline ${style}`} 
      to={nav} 
      onClick={onClick}  >
{text}
  </Link>
   )
} 