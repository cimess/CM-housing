
import Body from "../body component/homeBody";
import Login from "../Page-component/Login";
import  Default  from "../home-component/header-footer";
import Register from "@/Page-component/register";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HouseRegister from "@/Page-component/Agent";
import RecoverPassword from "@/Page-component/RecoverPassword";


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

 <Route path="/Register" element={ <Default>
<Register/>
</Default>}/>

<Route path="/HouseRegister" element={ <Default>
<HouseRegister/>
</Default>}/>

<Route path="/RecoverPassword" element={ <Default>
<RecoverPassword/>
</Default>}/>

         </Routes>
         
      </Router>


   )
}