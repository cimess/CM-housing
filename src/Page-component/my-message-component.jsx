import { message } from "@/data/messageBox"
import { faArrowLeft, faBars, faCamera, faFaceGrin, faMicrophone, faPaperclip, faPaperPlane, faPhone, faSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginAuth } from "@/Authentication/Usecontext-logic"

// pls fix the issue of when i refresh the page and the islogin is false but it still displaying the message component

export default function MyMessagePage() {
   const navigate = useNavigate()
   const { isLogin } = useLoginAuth()
   const [view, setView] = useState(false)
   useEffect(() => {
      if (!isLogin) return navigate('/')

   }, [isLogin, navigate])
   const [state, setState] = useState(true)
   const [id, setId] = useState(null)


   function handleChatDisplay() {
      setState((prev) => !prev)

   }


   return (
      view ? <motion.div
         initial={{ opacity: 0, x: 100 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: -100 }}
         transition={{ duration: 0.3 }}>
         <div className="mt-5 lg:px-5 lg:flex grid grid-col-1 ">
            {state ? <Inbox
               state={state}
               handleChatDisplay={handleChatDisplay}
               setId={setId} /> : ''}

            {state ? "" : <Chatbox state={state}
               handleChatDisplay={handleChatDisplay}
               id={id} />}


         </div>
      </motion.div> : <h1 className="min-h-screen flex justify-center items-center">COMMING SOON</h1>
   )

}


function Inbox({ state, handleChatDisplay, setId }) {
   return (
      <div className={`${state ? '' : 'hidden'} lg:max-w-[40%] shadow rounded-lg cursor-pointer bg-card`}>
         {message.map((mes, index) => (
            <div key={index} className="flex h-[70px] items-center border-b-2 border-border gap-x-2 p-2 last:border-none hover:bg-secondary/50 transition-colors" onClick={() => {
               handleChatDisplay()
               setId(mes.name)
            }
            }
            >
               <img src={mes.picture} className="object-cover rounded-full w-[40px] h-[40px]" />
               <div className="leading-tight text-muted-foreground font-ligh text-sm">
                  <p className="text-foreground">{mes.name}</p>
                  <p className="font-bold">{mes.title}</p>
                  <div className="flex items-center gap-x-1">
                     <p>{mes.message[0]}</p>

                     <div className="round-bg-mini w-2 h-2 font-medium text-sm p-2 bg-green-500"   >
                        <span>
                           {mes.message.length}
                        </span>
                     </div>

                  </div>

               </div>
            </div>
         ))}
      </div>
   )
}


function Chatbox({ state, handleChatDisplay, id }) {



   const [typing, setIsTyping] = useState(false)
   const [sendMessage, setSendMessage] = useState('')



   // const sendMessages=[]

   function handleTypingAndSendingMessage(e) {
      e.target.value.length > 0 ?
         setIsTyping(true) : setIsTyping(false)

      setSendMessage(e.target.value)

   }

   const profile = message.find(profile => profile.name === id)

   if (profile) {


      return (
         <div className={`lg:max-w-[80%] sm:${state ? 'hidden' : ""} shadow rounded-lg bg-secondary h-[500px] mx-3 lg:w-full`}>
            <div className="flex flex-col justify-between h-full ">

               <div>
                  <div className="flex justify-between bg-card p-1 items-center border-b-2 border-border">


                     {/* in this place i used the picture of the house but not correct but will change the message pic and the sender picture for the message so it perfect  */}

                     <div onClick={() => handleChatDisplay()} className='lg:hidden'>
                        <FontAwesomeIcon icon={faArrowLeft} className="ml-3 text-lg text-foreground" />
                     </div>


                     <div className="lg:flex lg:block hidden lg:gap-x-3 items-center">


                        <div onClick={() => handleChatDisplay()} className="">
                           <FontAwesomeIcon
                              icon={faArrowLeft}
                              className="ml-3 text-lg text-foreground" />
                        </div>

                        <img
                           src={profile.picture}
                           className="rounded-full h-[40px] w-[40px] " />

                     </div>



                     <div className="flex items-center gap-x-2">
                        <img
                           src={profile.picture}
                           className="rounded-full h-[40px] w-[40px] block lg:hidden" />
                        <p className="font-bold text-foreground">{profile.name}</p>

                     </div>


                     <div className="round-bg-mini p-2 border border-border">

                        <FontAwesomeIcon
                           icon={faBars}
                           className="text-2xl text-foreground" />
                     </div>

                  </div>

                  <div className="bg-card">
                     <div className="flex w-full justify-between p-2 lg:w-[80%] mx-auto">

                        <div className="flex items-center gap-x-2">

                           <img
                              src={profile.picture}
                              className="rounded h-[50px] w-[50px]" />

                           <div>
                              <p className="font-bold text-sm text-foreground">
                                 {profile.title}
                              </p>
                              <p className="text-sm text-green-400">
                                 ₦  {profile.price}
                              </p>
                           </div>


                        </div>
                        <button className="ml-2 button h-8 gap-x-2 flex items-center self-end">
                           <FontAwesomeIcon icon={faPhone} />
                           contact
                        </button></div>
                  </div>

               </div>

               <div className="bg-card h-[50px] flex items-center px-2 gap-x-2">
                  <div className="flex border border-input rounded-full h-[80%] w-[100%] items-center px-3 bg-background">
                     <FontAwesomeIcon
                        icon={faSmile}
                        className="text-xl text-muted-foreground stroke-muted-foreground cursor-pointer" />
                     <input
                        type="text"
                        placeholder="Message"
                        className="p-3 w-full outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                        onChange={handleTypingAndSendingMessage}
                        value={sendMessage}
                     />

                     <div className="gap-x-4 flex cursor-pointer">
                        <FontAwesomeIcon
                           icon={faPaperclip}
                           className="text-xl text-muted-foreground -rotate-45" />
                        <FontAwesomeIcon
                           icon={faCamera}
                           className="text-xl stroke-muted-foreground text-background "
                           style={{ strokeWidth: 50 }} />
                     </div>

                  </div>
                  <div className="round-bg-mini bg-primary h-2 w-2 p-4  text-primary-foreground cursor-pointer">{
                     typing ? <div><FontAwesomeIcon icon={faPaperPlane} className="rotate-50" /></div> : <div><FontAwesomeIcon icon={faMicrophone} /> </div>}
                  </div>
               </div>
            </div>



         </div>
      )

   }

}
