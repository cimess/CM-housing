
import Body from "@/body component/homeBody";
import Login from "@/Page-component/Login";
import  Default  from "@/home-component/header-footer";
import Register from "@/Page-component/register";
import {BrowserRouter as Router, Routes,Route,useLocation} from 'react-router-dom'
import HouseRegister from "@/Page-component/Agent";
import RecoverPassword from "@/Page-component/RecoverPassword";
import HouseOwner from "@/Page-component/ownerLogin";
import MyMessagePage from "@/Page-component/my-message-component";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRouter(){
   const location=useLocation()

   return(
      <AnimatePresence location={location} key={location.pathname} >
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

<Route path="/HouseOwner" element={ <Default>
<HouseOwner/>
</Default>}/>

<Route path="/MyMessagePage" element={ <Default>
<MyMessagePage/>
</Default>}/>

         </Routes>
      </AnimatePresence>
   )
}

export default function MyApp(){
   return(
      <Router>
       <AnimatedRouter/>
         
      </Router>


   )
}