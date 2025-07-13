
import Body from "../body component/homeBody";
import Login from "../Page-component/Login";
import  Default  from "../home-component/header-footer";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'




export default function MyApp(){
   return(
      <Router>
         <Routes>
            <Route path="/" element={ <Default>
<Body/>
</Default>} />

           <Route path="/Login" element={ <Default>
<Login/>
</Default>}/>
         </Routes>
      </Router>


   )
}