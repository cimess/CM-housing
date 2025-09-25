import { useState, useEffect } from "react";
import { message } from "@/data/messageBox";
import profileDemoPic from "../assets/profile-demo-pics/IMG-20250719-WA0002.jpg";
import API from '@/api/axios'
import Input from "@/body component/input-component";
export default function ProfilePage() {
  // ------------------ Normal Profile ------------------
  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    whatsapp: "",
    website: "",
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await API.get("/profile/me");
        if (res.data) {
          setUserForm({
            firstname: res.data.firstname || "",
            lastname: res.data.lastname || "",
            email: res.data.email || "",
            password: "",
            confirmPassword: "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            whatsapp: res.data.whatsapp || "",
            website: res.data.website || "",
          });
        } else {
          setUserForm({
            firstname: message[0].name,
            lastname: message[0].lastname,
            email: message[0].email,
            password: "",
            confirmPassword: "",
            phone: message[0].phone,
            address: message[0].location,
            whatsapp: message[0].phone,
            website: message[0].website,
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchUserProfile();
  }, []);

  function handleUserChange(e) {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  }

  async function saveUserProfile(e) {
    e.preventDefault();
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await API.post("/profile/save", userForm);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile!");
    }
  }

  // ------------------ Business/House Profile ------------------
  const [bizForm, setBizForm] = useState({
    dob: "",
    nin: "",
    idType: "",
    idNumber: "",
    company: "",
    website: "",
    rcNumber: "",
    companyAddress: "",
    officePhone: "",
  });

  useEffect(() => {
    API.get("/house-profile/me").then((res) => {
      if (res.data) setBizForm(res.data);
    });
  }, []);

  function handleBizChange(e) {
    setBizForm({ ...bizForm, [e.target.id]: e.target.value });
  }

async function saveBizProfile(e) {
  e.preventDefault();
  try {
    const res = await API.post("/profile/save", { ...bizForm, isCompleted: true });
    alert("Business profile saved!");
  } catch (err) {
    console.error(err);
    alert("Failed to save business profile!");
  }
}


  // ------------------ Render ------------------
  return (
    <div className="h-[600px] mx-3 shadow w-full overflow-y-scroll [scrollbar-width:none]">
      {/* Normal Profile */}
      <h2 className="text-xl text-center mt-3 font-bold">Profile Settings</h2>
      <div className="text-center mt-5 mb-2 flex justify-center">
        <img
          src={profileDemoPic}
          className="object-cover h-30 w-30 rounded-full"
          alt="profile"
        />
      </div>

      <form onSubmit={saveUserProfile} className="p-2 max-w-[900px] mx-auto">
        <div className="grid gap-4">
          <Input
            type="text"
            id="firstname"
            label="Firstname"
            value={userForm.firstname}
            onChange={handleUserChange}
          />
          <Input
            type="text"
            id="lastname"
            label="Lastname"
            value={userForm.lastname}
            onChange={handleUserChange}
          />
          <Input
            type="email"
            id="email"
            label="Email"
            value={userForm.email}
            onChange={handleUserChange}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            value={userForm.password}
            onChange={handleUserChange}
          />
          <Input
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            value={userForm.confirmPassword}
            onChange={handleUserChange}
          />
          <Input
            type="text"
            id="phone"
            label="Phone"
            value={userForm.phone}
            onChange={handleUserChange}
          />
          <Input
            type="text"
            id="address"
            label="Address"
            value={userForm.address}
            onChange={handleUserChange}
          />
          <Input
            type="text"
            id="whatsapp"
            label="Whatsapp Number"
            value={userForm.whatsapp}
            onChange={handleUserChange}
          />
          <Input
            type="text"
            id="website"
            label="Website"
            value={userForm.website}
            onChange={handleUserChange}
          />
        </div>

        <div className="text-center">
          <button className="button rounded-full mt-7 w-[120px]">
            Save Profile
          </button>
        </div>
      </form>

      {/* Divider */}
      <hr className="my-10 border-gray-400" />

      {/* Business Profile */}
      <h2 className="text-xl text-center mt-3 font-bold">
        Business (House Listing) Profile
      </h2>

      <form onSubmit={saveBizProfile} className="p-2 max-w-[900px] mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            id="dob"
            value={bizForm.dob}
            onChange={handleBizChange}
            label="Date of Birth"
          />
          <Input
            type="text"
            id="nin"
            value={bizForm.nin}
            onChange={handleBizChange}
            label="NIN"
          />
          <Input
            type="text"
            id="idType"
            value={bizForm.idType}
            onChange={handleBizChange}
            label="ID Type"
          />
          <Input
            type="text"
            id="idNumber"
            value={bizForm.idNumber}
            onChange={handleBizChange}
            label="ID Number"
          />
          <Input
            type="text"
            id="company"
            value={bizForm.company}
            onChange={handleBizChange}
            label="Company Name"
          />
          <Input
            type="text"
            id="website"
            value={bizForm.website}
            onChange={handleBizChange}
            label="Website"
          />
          <Input
            type="text"
            id="rcNumber"
            value={bizForm.rcNumber}
            onChange={handleBizChange}
            label="RC Number"
          />
          <Input
           
            type="text"
            id="companyAddress"
            value={bizForm.companyAddress}
            onChange={handleBizChange}
            label="Company Address"
          />
          <Input
         
            type="text"
            id="officePhone"
            value={bizForm.officePhone}
            onChange={handleBizChange}
            label="Office Phone Number"

          />
        </div>

        <div className="text-center">
          <button className="button rounded-full mt-7 w-fit">
            Save Business Profile
          </button>
        </div>
      </form>
    </div>
  );
}
{/* <fieldset className="border rounded">
              <legend className="ml-3 font-light">Address</legend>
              <Input
                type="text"
                id="address"
                className="input pb-1 px-2 w-full"
                value={formData.address}
                onChange={handleChange}
              />
            </fieldset> */}