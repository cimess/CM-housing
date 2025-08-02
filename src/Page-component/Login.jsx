import LoginComponent from "@/full-Component/login";
import { motion } from "framer-motion";



export default function Login(){
 function HandleLoginAuth(){
      console.log('hello')
      setUseLoginAuth(true)
      alert('Welcome back')
navigate('/Register')

   }


   return(
      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}>

<LoginComponent header='Login as Guest' />
</motion.div>
   )
}