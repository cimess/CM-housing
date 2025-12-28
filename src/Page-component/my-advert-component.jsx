import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faComments,
  faChartLine,
  faGear,
  faMoon,
  faLocationDot,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import HouseListing from "@/shortlet/shortlet-house";
import Settings from "./profile";
import LoadingAnimation from "@/animations/LoadingAnim";
import API from "@/api/axios";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function MyadvertComponent() {
  const [state, setState] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const { user } = useLoginAuth();

  function handleAdvertState(value) {
    setState(value);
    setShowContent(true);
  }

  function handleBack() {
    setShowContent(false);
  }

  const menuItems = [
    { id: 1, label: "My Adverts", icon: faCalendarDays },
    { id: 2, label: "Feedback", icon: faComments },
    { id: 3, label: "Performance", icon: faChartLine },
    { id: 4, label: "Edit Profile", icon: faGear },
    { id: 5, label: "Dark Mode", icon: faMoon },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* 🧊 Sidebar */}
        <div className={`${showContent ? "hidden md:block" : "block"} md:col-span-4 lg:col-span-3`}>
          <div className="glass-panel p-6 rounded-3xl border border-white/10 sticky top-24">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-primary to-amber-600 mb-4">
                <img
                  src={user?.picture || "/default-avatar.jpg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-background"
                />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">{user?.firstname || "Guest User"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAdvertState(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    state === item.id
                      ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-border">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📄 Content Area */}
        <div className={`${showContent ? "block" : "hidden md:block"} md:col-span-8 lg:col-span-9`}>
          <div className="glass-panel min-h-[600px] p-6 md:p-8 rounded-3xl border border-border relative bg-card/50 backdrop-blur-xl">

            {/* Mobile Back Button */}
            <button
              onClick={handleBack}
              className="md:hidden mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to Menu</span>
            </button>

            <motion.div
              key={state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {state === 1 && <ClientAdvert />}
              {state === 2 && <Feedback />}
              {state === 3 && <Performance />}
              {state === 4 && <Settings />}
              {state === 5 && <Darkmode />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientAdvert() {
  const { fetchMyHouses } = useLoginAuth();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchHouse();
  }, []);

  async function handleFetchHouse() {
    setLoading(true);
    const data = await fetchMyHouses();
    setHouses(data);
    setLoading(false);
  }

  const handleDelete = async (houseId) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      setLoading(true);
      await API.delete(`/houses/${houseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await handleFetchHouse();
      alert("Listing deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete listing.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">My Listings</h2>
      {houses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house, index) => (
            <div key={index} className="relative group">
              <HouseListing {...house} />
              <button
                onClick={() => handleDelete(house._id)}
                className="absolute top-4 right-4 bg-destructive/90 hover:bg-destructive text-destructive-foreground p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                title="Delete Listing"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">You haven't listed any properties yet.</p>
        </div>
      )}
    </div>
  );
}

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchFeedback();
  }, []);

  async function handleFetchFeedback() {
    try {
      setLoading(true);
      const res = await API.get("/houses/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingAnimation />;

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Guest Feedback</h2>
      <div className="grid gap-6">
        {feedback.length > 0 ? (
          feedback.map((f, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {f.user?.username ? f.user.username[0].toUpperCase() : "G"}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{f.user?.username || "Guest"}</p>
                    <p className="text-xs text-muted-foreground">{f.user?.email}</p>
                  </div>
                </div>
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
                  {f.rating} ★
                </div>
              </div>

              <p className="text-muted-foreground italic mb-4">"{f.text}"</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>
                  {f.location
                    ? `${f.location.state || ""} ${f.location.lga || ""} ${f.location.town || ""}`
                    : "Unknown Location"}
                </span>
                <span className="mx-2">•</span>
                <span>Property: {f.houseTitle}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No feedback received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Performance() {
  const stats = [
    { label: "Total Visitors", value: 124, change: "+12%" },
    { label: "Chat Requests", value: 8, change: "+5%" },
    { label: "Followers", value: 45, change: "+2%" },
    { label: "Total Reviews", value: 12, change: "+18%" },
    { label: "Likes", value: 89, change: "+24%" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Performance Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-2xl border border-border hover:bg-secondary/50 transition-colors shadow-sm">
            <p className="text-muted-foreground text-sm mb-2 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-foreground">{stat.value}</span>
              <span className="text-emerald-500 text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Darkmode() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-center">
      <div className="mb-6 scale-150">
        <ThemeToggle />
      </div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Appearance</h2>
      <p className="text-muted-foreground">Switch between Dark and Light mode to suit your preference.</p>
    </div>
  );
}
