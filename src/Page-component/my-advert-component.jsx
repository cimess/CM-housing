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
} from "@fortawesome/free-solid-svg-icons";
import { message } from "@/data/messageBox";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import HouseListing from "@/shortlet/shortlet-house";
import Settings from "./profile";
import LoadingAnimation from "@/animations/LoadingAnim";
import API from "@/api/axios";

export default function MyadvertComponent() {
  const [state, setState] = useState(0);
  const [showContent, setShowContent] = useState(false); // 👈 for small screens
  const [users,setUsers]=useState(false)
 const { user,fetchUserProfile } = useLoginAuth();
 
 useEffect(()=>{
setUsers(user)
 },[])
  function handleAdvertState(value) {
    setState(value);
    setShowContent(true); // 👈 when small screen, switch view
  }

  function handleBack() {
    setShowContent(false); // 👈 go back to menu
  }

  function HandleDisplayComponent({ state }) {
 
    switch (state) {
      case 1:
        return <ClientAdvert />;
      case 2:
        return <Feedback />;
      case 3:
        return <Performance />;
      case 4:
        return <Settings />;
      case 5:
        return (
          <div className="self-center mx-auto">
            <Darkmode />
          </div>
        );
      default:
        return <h1 className="self-center mx-auto ">Nothing to display</h1>;
    }
  }

  return (
    <div className="flex h-[600px]">
      {/* Sidebar for medium+ OR small-screen menu */}
      <div
        className={`${
          showContent ? "hidden" : "block"
        } md:block w-full md:w-[30%] lg:w-[50%]`}
      >
        <main className="shadow rounded-lg h-[500px] py-4">
         

<div className="flex items-center flex-col">
  <img
    src={users?.picture || "/default-avatar.jpg"}
    className="rounded-full h-20 w-20 lg:w-32 lg:h-32 mb-4"
  />
  <p className="text-xl lg:text-2xl">{users?.firstname || "Guest"}</p>
  <p className="sm:text-sm text-gray-600">{users?.email || ""}</p>
</div>


          <div
            className="flex py-3 gap-x-3 px-2 border-b cursor-pointer mt-10 hover-bg items-center"
            onClick={() => handleAdvertState(1)}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="text-lg" />
            <p>My advert</p>
          </div>

          <div
            className="flex py-3 gap-x-3 px-2 border-b cursor-pointer hover-bg"
            onClick={() => handleAdvertState(2)}
          >
            <FontAwesomeIcon icon={faComments} className="text-lg" />
            <p>Feedback</p>
          </div>

          <div
            className="flex py-3 gap-x-3 px-2 border-b cursor-pointer hover-bg"
            onClick={() => handleAdvertState(3)}
          >
            <FontAwesomeIcon icon={faChartLine} className="text-lg" />
            <p>Performance</p>
          </div>

          <div
            className="flex py-3 gap-x-3 px-2 border-b cursor-pointer hover-bg items-center"
            onClick={() => handleAdvertState(4)}
          >
            <FontAwesomeIcon icon={faGear} className="text-lg" />
            <p>Edit profile</p>
          </div>

          <div
            className="flex py-3 gap-x-3 px-2 border-b cursor-pointer hover-bg items-center"
            onClick={() => handleAdvertState(5)}
          >
            <FontAwesomeIcon icon={faMoon} className="text-lg" />
            <p>Darkmode</p>
          </div>
        </main>
      </div>

      {/* Content area */}
      <div
  className={`${
    showContent ? "block w-full" : "hidden"
  } md:block md:w-[70%] lg:w-[50%]`}
>
  {/* Container with back button fixed at top */}
  <div className="relative h-full flex flex-col">
    
    {/* Sticky header */}
    <div className="md:hidden sticky top-0 bg-white shadow z-50 flex items-center gap-x-2 p-3">
      <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
      <span>Back</span>
    </div>

    {/* Scrollable content below */}
    <div className="flex-1 overflow-y-auto p-2">
      <HandleDisplayComponent state={state} />
    </div>
  </div>
</div>

    </div>
  );
}

function ClientAdvert() {
  const { fetchMyHouses } = useLoginAuth();
  const [house, setHouse] = useState([]);
const [loading,setLoading]=useState(false)

  useEffect(() => {
    handleFetchHouse();
  }, []);

  async function handleFetchHouse() {
    setLoading(true)
    const houses = await fetchMyHouses();
    setHouse(houses);
    
    setLoading(false)
  }

    const handleDelete = async (houseId) => {
    if (!confirm("Are you sure you want to delete this house?")) return;

    try {
      setLoading(true);
      await API.delete(`/houses/${houseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await fetchMyHouses(); // refresh list
      alert("House deleted successfully ✅");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete house ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>{loading? <LoadingAnimation/>: <div className="grid grid-cols-1 md:grid-cols-3 gap-5  overflow-y-scroll">
      {house.length > 0 ? (
        house.map((houses, index) =><div className="w-full "><div className="relative"> <HouseListing key={index} {...houses} />
        <button
                onClick={() => handleDelete(houses._id)}
                disabled={loading}
                className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                {loading ? "Deleting..." : "Delete"}
              </button></div></div>)
      ) : (
        <h2 className="text-center w-full">No houses available.</h2>
      )}
    </div>}
    </>
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
      console.error("❌ Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingAnimation />;

  return (
    <div className="h-[500px] mx-3 overflow-y-scroll">
      <h2 className="text-xl text-center mt-3 border-b font-semibold">
        Feedback on My Adverts
      </h2>

      <div className="grid lg:grid-cols-2 w-full h-full gap-2 py-3">
        {feedback.length > 0 ? (
          feedback.map((f, i) => (
            <div
              key={i}
              className="border rounded shadow p-4 flex flex-col gap-y-3"
            >
              <div className="flex items-center gap-x-2">
                <img
                  src="/default-avatar.jpg"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-bold">{f.user?.username || "Anonymous"}</p>
                  <p className="text-gray-500 text-xs">{f.user?.email}</p>
                </div>
              </div>

              <p className="text-gray-700 italic">"{f.text}"</p>

              <div className="flex items-center gap-x-2">
                <p className="font-semibold">{f.rating} ★</p>
              </div>

              <div className="text-sm text-gray-600 mt-1">
  <FontAwesomeIcon icon={faLocationDot} />{" "}
  {f.location
    ? `${f.location.state || ""} ${f.location.lga || ""} ${f.location.town || ""} ${f.location.address || ""}`
    : "N/A"}
</div>


              <p className="font-semibold text-gray-800 text-sm">
                House: {f.houseTitle}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-center w-full text-gray-500">
            No feedback on your listings yet.
          </h2>
        )}
      </div>
    </div>
  );
}

function Performance() {
  return (
    <div className="h-[500px] mx-3 shadow w-full">
      <h2 className="text-xl text-center mt-3 border-b font-semibold">
        Performance
      </h2>

      <div className="p-2 flex flex-wrap">
        <button className="box mx-1 bg-black/80 text-white">
          visitors<p className="text-xl font-bold">{1}</p>
        </button>
        <button className="box mx-1 bg-black/80 text-white">
          chat request<p className="text-xl font-bold">{1}</p>
        </button>
        <button className="box mx-1 bg-black/80 text-white">
          followers<p className="text-xl font-bold">{1}</p>
        </button>
        <button className="box mx-1 bg-black/80 text-white">
          feedback<p className="text-xl font-bold">{1}</p>
        </button>
        <button className="box mx-1 bg-black/80 text-white">
          likes<p className="text-xl font-bold">{1}</p>
        </button>
      </div>
    </div>
  );
}

function Darkmode() {
  return <h1 className="text-center mt-10">COMING SOON</h1>;
}
