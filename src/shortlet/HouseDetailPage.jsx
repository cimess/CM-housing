import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShareAlt,
  faArrowLeft,
  faStar,
  faMapMarkerAlt,
  faBed,
  faBath,
  faDog,
  faCouch,
  faPhone,

} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import API from "@/api/axios";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import HouseListing from "@/shortlet/shortlet-house";

/**
 * Premium House Detail Page
 * - Sticky sidebar for booking (md+)
 * - Floating mobile booking bar
 * - Framer Motion reveal on scroll
 * - Swiper gallery with lazy images
 * - Skeleton loaders while fetching
 *
 * Requirements:
 * - API endpoints:
 *   GET /houses/:id/details
 *   POST /houses/:id/like
 *   POST /houses/:id/comment  (body: { text, rating })
 *
 * - house object should include:
 *   _id, houseType, description, images[], amenities[], location, pricePerNight, rentPrice,
 *   durationType, comments[], likes[], owner (string), ownerEmail, createdAt, bedrooms, bathrooms, furnished, petAllowed
 */

function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="bg-gray-200 rounded-lg h-64" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  );
}

export default function HouseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleLike,isLogin,likedHouses } = useLoginAuth();

  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [similarHouses, setSimilarHouses] = useState([]);

  useEffect(() => {
    fetchHouseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchHouseDetails() {
    setLoading(true);
    try {
      const res = await API.get(`/houses/${id}/details`);
      const data = res.data;
      setHouse(data);

      // load similar houses (by state) — robust: fallback to all houses if not ok
      try {
        const related = await API.get(`/houses?location=${encodeURIComponent(data.location?.state || "")}`);
        const filtered = (related.data || []).filter((h) => h._id !== data._id);
        setSimilarHouses(filtered);
      } catch (err) {
        setSimilarHouses([]);
      }
    } catch (err) {
      console.error("Failed to fetch house details:", err);
      setHouse(null);
    } finally {
      setLoading(false);
    }
  }


 const isLiked =likedHouses.includes(userId)
 
  function handleLike(){
 if(!isLogin){
   alert('Please login to like this property.')
 }
 
 toggleLike()
 }

  async function handleAddComment() {
    if (!newComment.trim()) return;
    if (!rating || rating < 1) {
  alert("Please select at least 1 star before submitting your review");
  return;
}

    try {
      await API.post(`/houses/${id}/comment`, { text: newComment, rating });
      setNewComment("");
      setRating(0);
      fetchHouseDetails();
    } catch (err) {
      console.error("comment failed", err);
    }
  }

  // motion variants for reveal on scroll
  const reveal = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  // Mobile floating booking bar
  const MobileBookingBar = () => (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] sm:w-[640px]">
      <div className="bg-white shadow-lg rounded-full px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Listing Price </div>
          <div className="font-semibold">₦{house?.pricePerNight || house?.rentPrice}</div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() =>
      window.open(`https://wa.me/${house.user.whatsapp}`, `hello ${house.companyName} saw your ads from CMHousing`)
    }
            className="bg-emerald-600 text-white px-4 py-2 rounded-full  w-[100px]"
          >
            <FontAwesomeIcon
      icon={faWhatsapp}
      className=" text-2xl text-white"
    />
    
          </button>
          <button className="px-3 py-2 border rounded-full w-[100px] text-center"  onClick={() => (window.location.href = `tel:${house.user.phone}`)}><FontAwesomeIcon
      icon={faPhone}
      className="text-xl text-gray-700 "
    />
     </button>
        </div>
      </div>
    </div>
  );
  

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <SkeletonCard />
      </div>
    );
  }

  if (!house) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Oops — listing not found.
      </div>
    );
  }

  const displayPrice = house.durationType === "short" ? house.pricePerNight : house.rentPrice;

  return (
    <motion.div initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="hidden sm:inline">Back to search results</span>
        </button>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="text-gray-600 hover:text-black"
            title="Copy URL"
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </button>

          <button onClick={handleLike} title="Like this property">
            <FontAwesomeIcon icon={faHeart} className={liked ? "text-red-500 text-xl" : "text-gray-600 text-2xl"} />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <motion.section variants={reveal} className="relative mb-8" viewport={{ once: true }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
       
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="rounded-xl overflow-hidden"
        >
          {(house.images?.length ? house.images : ["/placeholder.jpg"]).map((src, idx) => (
            <SwiperSlide key={idx}>
              {/* lazy loading images */}
              <img
                src={src}
                alt={house.alt || `house-${idx}`}
                className="w-full h-[65vh] object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          Verified Listing
        </div>
        <div className="absolute bottom-4 right-4 bg-white/80 text-gray-900 px-3 py-1 rounded-full text-sm">
          {house.durationType === "short" ? "Short Let" : "Full Let"}
        </div>
      </motion.section>

      {/* Grid: details + sidebar */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.div variants={reveal} className="md:col-span-2 space-y-6" viewport={{ once: false }}>
          {/* header */}
          <div>
            <h1 className="text-3xl font-bold">{house.houseType}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {house.location?.state}, {house.location?.town}
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBed} /> {house.bedrooms} Beds
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBath} /> {house.bathrooms} Baths
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCouch} /> {house.furnished ? "Furnished" : "Unfurnished"}
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faDog} /> {house.petAllowed ? "Pets OK" : "No Pets"}
              </span>
            </div>

            <div className="mt-3">
              <span className="text-3xl font-semibold text-emerald-700">₦{displayPrice}</span>
              <span className="text-sm text-gray-500 ml-2">/ {house.durationType === "short" ? "night" : "month"}</span>
            </div>
          </div>

          {/* description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{house.description}</p>
          </div>

          {/* Email */}
           <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-700 leading-relaxed">{house.user.email}</p>
          </div>

          {/* amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600">
              {(house.amenities || []).map((a, i) => (
                <li key={i} className="flex items-center gap-2">• {a}</li>
              ))}
            </ul>
          </div>

          {/* reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Reviews</h2>

            {house.comments?.length ? (
              <div className="space-y-4">
                {house.comments.map((c, i) => (
                  <div key={i} className="border-b pb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center gap-1">
                        {[...Array(c.rating || 0)].map((_, idx) => (
                          <FontAwesomeIcon key={idx} icon={faStar} className="text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">by {c.username || "Guest"}</div>
                    </div>
                    <p className="text-gray-700">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No reviews yet — be the first to review.</p>
            )}

            {isLogin && (
              <div className="mt-4 space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border border-gray-300 rounded-md p-3 resize-none"
                  rows={3}
                />
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-gray-500">Give Rating </span>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FontAwesomeIcon
                      key={num}
                      icon={faStar}
                      className={`cursor-pointer ${num <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setRating(num)}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddComment} className="bg-black text-white px-5 py-2 rounded">
                    Submit Review
                  </button>
                  <button onClick={() => { setNewComment(""); setRating(0); }} className="px-4 py-2 border rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          variants={reveal}
          className="space-y-6"
          viewport={{ once: false }}
        >
          <div className="bg-white border rounded-lg p-5 shadow-sm md:sticky md:top-20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Host</div>
                <div className="font-semibold">{house.companyName || "Private Landlord"}</div>
                <div className="text-xs text-gray-400">{house.ownerEmail}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Date Listed</div>
                <div className="text-sm text-gray-700">{new Date(house.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

           <div className="mt-4">
  {/* WhatsApp Button */}
  <button
    onClick={() =>
      window.open(`https://wa.me/${house.user.whatsapp}`, "_blank")
    }
    className="relative w-full border py-2 rounded-md flex items-center justify-center bg-emerald-600 mb-1 text-white hover:bg-emerald-700 transition"
  >
    <FontAwesomeIcon
      icon={faWhatsapp}
      className="absolute left-3 text-2xl text-white"
    />
    <span>WhatsApp</span>
  </button>

  {/* Contact Host (Phone) Button */}
  <button
    onClick={() => (window.location.href = `tel:${house.user.phone}`)}
    className="relative w-full border py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
  >
    <FontAwesomeIcon
      icon={faPhone}
      className="absolute left-3 text-xl text-gray-700"
    />
    <span>Contact Host</span>
  </button>
</div>

          </div>

          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold mb-2">Safety Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Inspect property before payment</li>
              <li>• Meet the agent/Landlord in a public place</li>
              <li>• Avoid sending money to unknown accounts </li>
               <li>•The Agent/Landlord does not represent CMHousing and CMHousing is not liable for any monetary transaction between you and the Landlord/Agent.</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Property ID</h3>
            <div className="text-sm text-gray-700">PID: {house._id}</div>
          </div>
        </motion.aside>
      </div>

      {/* Similar Listings */}
      <motion.section variants={reveal} className="mt-12" viewport={{ once: false }}>
        <h2 className="text-2xl font-semibold mb-5">Similar Listings</h2>
        {similarHouses.length ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {similarHouses.slice(0, 8).map((h) => (
              <Link to={`/house/${h._id}`} key={h._id}>
                <div className="max-w-[400px] "><HouseListing {...h} /></div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No similar listings found.</p>
        )}
      </motion.section>

      {/* mobile sticky booking */}
      <div className="md:hidden">
        <MobileBookingBar />
      </div>
    </motion.div>
  );
}
