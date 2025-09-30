import { useState, useEffect } from "react";
import profileDemoPic from "../assets/profile-demo-pics/IMG-20250719-WA0002.jpg";
import API from "@/api/axios";
import Input from "@/body component/input-component";
import { useAxiosAuth } from "@/Authentication/useAxiosAuth";
import LoadingAnimation from "@/animations/LoadingAnim";

export default function ProfilePage() {
  useAxiosAuth();

  // ------------------ States ------------------
  const [loading, setLoading] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [savingBiz, setSavingBiz] = useState(false);

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

  const [bizForm, setBizForm] = useState({
    dob: "",
    nin: "",
    idType: "",
    idNumber: "",
    company: "",
    rcNumber: "",
    officePhone: "",
  });

  // ------------------ Fetch Data ------------------
useEffect(() => {
  async function fetchProfiles() {
    try {
      const [userRes, bizRes] = await Promise.all([
        API.get("/profile/me").catch(() => ({ data: {} })),
        API.get("/business-profile/me").catch(() => ({ data: {} })),
      ]);
console.log(bizRes.data)
      const u = userRes.data || {};
      const b = bizRes.data || {};

      setUserForm(prev => ({
        ...prev,
        firstname: u.firstname || "",
        lastname: u.lastname || "",
        email: u.email || "",
        phone: u.phone || "",
        address: u.address || "",
        whatsapp: u.whatsapp || "",
        website: u.website || "",
      }));

      setBizForm(prev => ({
        ...prev,
        dob: b.dob || "",
        nin: b.nin || "",
        idType: b.idType || "",
        idNumber: b.idNumber || "",
        company: b.company || "",
        rcNumber: b.rcNumber || "",
        officePhone: b.officePhone || "",
      }));
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }finally {
  setLoading(false);
}

  }
  fetchProfiles();
}, []);


  // ------------------ Handlers ------------------
  const handleUserChange = (e) =>
    setUserForm({ ...userForm, [e.target.id]: e.target.value });

  const handleBizChange = (e) =>
    setBizForm({ ...bizForm, [e.target.id]: e.target.value });

  const saveUserProfile = async (e) => {
    e.preventDefault();

    try {
      setSavingUser(true);
      await API.post("/profile/save", payload);
      alert("User profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save user profile!");
    } finally {
      setSavingUser(false);
    }
  };

  const saveBizProfile = async (e) => {
  e.preventDefault();
  try {
    setSavingBiz(true);
    await API.post("/business-profile/save", { ...bizForm }); // <-- correct endpoint
    alert("Business profile saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to save business profile!");
  } finally {
    setSavingBiz(false);
  }
};


  // ------------------ Render ------------------
  if (loading)
    return (
     <LoadingAnimation/>
    );

  return (
    <div className="h-[100vh] mx-3 shadow w-full overflow-y-scroll [scrollbar-width:none]">
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
          {[
            { id: "firstname", label: "Firstname", type: "text" },
            { id: "lastname", label: "Lastname", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "text" },
            { id: "address", label: "Address", type: "text" },
            { id: "whatsapp", label: "Whatsapp Number", type: "text" },
            { id: "website", label: "Website", type: "text" },
          ].map((input) => (
            <Input
              key={input.id}
              type={input.type}
              id={input.id}
              label={input.label}
              inputValue={userForm[input.id]}
              onChange={handleUserChange}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={savingUser}
            className={`button rounded-full mt-7 w-[150px] ${
              savingUser ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {savingUser ? "Saving..." : "Save Profile"}
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
          {[
            { id: "dob", label: "Date of Birth", type: "date" },
            { id: "nin", label: "NIN", type: "text" },
            { id: "idType", label: "ID Type", type: "text" },
            { id: "idNumber", label: "ID Number", type: "text" },
            { id: "company", label: "Company Name", type: "text" },
            { id: "rcNumber", label: "RC Number", type: "text" },
            { id: "officePhone", label: "Office Phone", type: "text" },
          ].map((input) => (
            <Input
              key={input.id}
              type={input.type}
              id={input.id}
              label={input.label}
             inputValue={bizForm[input.id]}
              onChange={handleBizChange}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={savingBiz}
            className={`button rounded-full mt-7 w-fit ${
              savingBiz ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {savingBiz ? "Saving..." : "Save Business Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
