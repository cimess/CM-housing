import { useState, useEffect } from "react";
import { toast } from "sonner";
import API from "@/api/axios";
import LoadingAnimation from "@/animations/LoadingAnim";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faSave, faCamera } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const { isLogin, updateUser } = useLoginAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) return navigate('/');
  }, [isLogin, navigate]);

  // ------------------ States ------------------
  const [loading, setLoading] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [savingBiz, setSavingBiz] = useState(false);

  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
    website: "",
    profileImage: "",
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
          address: u.address || "",
          whatsapp: u.whatsapp || "",
          website: u.website || "",
          profileImage: u.profileImage || "",
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
      } finally {
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
      await API.post("/profile/save", { ...userForm });
      toast.success("User profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save user profile!");
    } finally {
      setSavingUser(false);
    }
  };

  const saveBizProfile = async (e) => {
    e.preventDefault();
    try {
      setSavingBiz(true);
      await API.post("/business-profile/save", { ...bizForm });
      toast.success("Business profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save business profile!");
    } finally {
      setSavingBiz(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const toastId = toast.loading("Uploading profile image...");

    try {
      const res = await API.post("/auth/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserForm(prev => ({ ...prev, profileImage: res.data.user.profileImage }));
      // Update global context so header/sidebar update immediately
      updateUser(res.data.user);

      toast.success("Profile image updated!", { id: toastId });
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload image", { id: toastId });
    }
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="h-full overflow-y-auto pb-20">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Profile Settings</h2>

      {/* 👤 Personal Profile Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden border-2 border-primary/20">
              {userForm.profileImage ? (
                <img src={userForm.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              )}
            </div>

            <label className="absolute bottom-0 right-0 w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm">
               <FontAwesomeIcon icon={faCamera} className="text-xs" />
               <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
        </div>

        <form onSubmit={saveUserProfile} className="bg-card p-6 rounded-3xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "firstname", label: "First Name", type: "text" },
              { id: "lastname", label: "Last Name", type: "text" },
              { id: "email", label: "Email Address", type: "email" },
              { id: "phone", label: "Phone Number", type: "text" },
              { id: "address", label: "Address", type: "text", fullWidth: true },
              { id: "whatsapp", label: "WhatsApp Number", type: "text" },
              { id: "website", label: "Website URL", type: "text" },
            ].map((field) => (
              <div key={field.id} className={field.fullWidth ? "md:col-span-2" : ""}>
                <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={userForm[field.id]}
                  onChange={handleUserChange}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={savingUser}
              className="bg-primary hover:bg-primary/90 text-black font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingUser ? (
                <>Saving...</>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 💼 Business Profile Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
            <FontAwesomeIcon icon={faBriefcase} />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Business Profile</h3>
        </div>

        <form onSubmit={saveBizProfile} className="bg-card p-6 rounded-3xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "company", label: "Company Name", type: "text" },
              { id: "rcNumber", label: "RC Number", type: "text" },
              { id: "officePhone", label: "Office Phone", type: "text" },
              { id: "dob", label: "Date of Birth", type: "date" },
              { id: "nin", label: "NIN", type: "text" },
              { id: "idType", label: "ID Type", type: "text" },
              { id: "idNumber", label: "ID Number", type: "text" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={bizForm[field.id]}
                  onChange={handleBizChange}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={field.type === 'date' ? '' : `Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={savingBiz}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingBiz ? (
                <>Saving...</>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  Save Business Info
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
