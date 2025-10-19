import { motion } from "framer-motion";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Input from "../body component/input-component";
import API from "../api/axios";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import LoadingAnimation from "@/animations/LoadingAnim";
// import { useAxiosAuth } from "@/Authentication/useAxiosAuth";
export default function Register() {
  // useAxiosAuth()
  const navigate = useNavigate();
  const { setIsLogin } = useLoginAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", {
        firstname,
        lastname,
        phone,
        email,
        password,
      });``

      alert("Registration successful. Please verify your email.");
      setIsLogin(false); // user not logged in until verification
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

if(loading)return <LoadingAnimation/>

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center w-[90%] md:w-[70%] mx-auto py-10">
        <h1 className="font-montserrat my-5">Guest Registration</h1>
        <span className="text-gray-600 mb-8 block">
          Join us and explore homes made for you
        </span>

        <form className="w-[80%] mx-auto text-left" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-x-5">
            <Input label="First name" add="*" type="text" id="firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
            <Input label="Last name" add="*" type="text" id="lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
            <Input label="Email address" add="*" type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input label="Confirm email address" add="*" type="email" id="confirmemail" value={confirmEmail} onChange={(e)=>setConfirmEmail(e.target.value)}/>
            <Input label="Phone number" add="*" type="tel" id="phone" pattern="[0-9]*" inputMode="numeric" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <Input label="Password" add="*" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Input label="Confirm password" add="*" type="password" id="confirmpassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>

          <div className="my-4 flex items-center gap-x-3 text-sm text-gray-500">
            <input type="checkbox" className="h-4 w-4 accent-black" /> 
            <label>Subscribe to newsletter</label>
          </div>

          <div className="my-4 flex items-center gap-x-3 text-sm text-gray-500">
            <input type="checkbox" className="h-4 w-4 accent-black" required />
            <label>
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 underline">Terms & Conditions</a>
            </label>
          </div>

          <div className="text-center">
            <button className="button rounded-full mt-7 w-[150px]" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
