import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
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
  faShieldAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import API from "@/api/axios";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import HouseListing from "@/shortlet/shortlet-house";
import Image from "@/components/ui/Image";
import { Helmet } from 'react-helmet-async';

function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-[50vh] w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    </div>
  );
}

export default function HouseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleLike, isLogin, likedHouses } = useLoginAuth();

  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [similarHouses, setSimilarHouses] = useState([]);

  useEffect(() => {
    fetchHouseDetails();
    window.scrollTo(0, 0);
  }, [id]);

  async function fetchHouseDetails() {
    setLoading(true);
    try {
      const res = await API.get(`/houses/${id}/details`);
      const data = res.data;
      setHouse(data);

      try {
        const related = await API.get(`/houses?location=${encodeURIComponent(data.location?.state || "")}`);
        const filtered = (related.data || []).filter((h) => h._id !== data._id);
        setSimilarHouses(filtered);
      } catch (err) {
        setSimilarHouses([]);
      }
    } catch (err) {
      // console.error("Failed to fetch house details:", err);
      setHouse(null);
    } finally {
      setLoading(false);
    }
  }

  const isLiked = likedHouses.includes(house?._id);

  function handleLike() {
    if (!isLogin) {
      toast.error('Please login to like this property.');
      return;
    }
    toggleLike(house._id);
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;
    if (!rating || rating < 1) {
      toast.error("Please select at least 1 star before submitting your review");
      return;
    }

    try {
      await API.post(`/houses/${id}/comment`, { text: newComment, rating });
      setNewComment("");
      setRating(0);
      fetchHouseDetails();
    } catch (err) {
      // console.error("comment failed", err);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <SkeletonCard />
      </div>
    );
  }

  if (!house) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground gap-4">
        <h2 className="text-2xl font-serif">Listing Not Found</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">Return Home</button>
      </div>
    );
  }

  const displayPrice = house.durationType === "short" ? house.pricePerNight : house.rentPrice;



  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Helmet>
        <title>{house.houseType} in {house.location?.state} | CMHousing</title>
        <meta name="description" content={house.description?.substring(0, 150) + "..."} />
        <meta property="og:title" content={`${house.houseType} - ₦${displayPrice?.toLocaleString()}`} />
        <meta property="og:description" content={house.description?.substring(0, 150) + "..."} />
        <meta property="og:image" content={house.images?.[0] || "/placeholder.jpg"} />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* 📸 Immersive Hero Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >


          {(house.images?.length ? house.images : ["/placeholder.jpg"]).map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={house.alt || `Luxury Stay ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
            >
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
            <button
              onClick={handleLike}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
            >
              <FontAwesomeIcon icon={faHeart} className={isLiked ? "text-red-500" : ""} />
            </button>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${house.isAvailable !== false ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                  {house.isAvailable !== false ? "Available" : "Taken"}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-wider">
                  {house.durationType === "short" ? "Short Let" : "Full Let"}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                  Verified Listing
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 leading-tight">
                {house.houseType}
              </h1>
              <div className="flex items-center text-gray-300 text-lg">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary" />
                {house.location?.state}, {house.location?.town}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 📝 Main Content */}
        <div className="lg:col-span-2 space-y-12">

          {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-secondary/5 border border-border">
            <div className="text-center p-4 rounded-xl bg-background shadow-sm">
              <FontAwesomeIcon icon={faBed} className="text-2xl text-primary mb-2" />
              <div className="font-bold text-lg">{house.bedrooms}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Bedrooms</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-background shadow-sm">
              <FontAwesomeIcon icon={faBath} className="text-2xl text-primary mb-2" />
              <div className="font-bold text-lg">{house.bathrooms}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Bathrooms</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-background shadow-sm">
              <FontAwesomeIcon icon={faCouch} className="text-2xl text-primary mb-2" />
              <div className="font-bold text-lg">{house.furnished ? "Yes" : "No"}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Furnished</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-background shadow-sm">
              <FontAwesomeIcon icon={faDog} className="text-2xl text-primary mb-2" />
              <div className="font-bold text-lg">{house.petAllowed ? "Yes" : "No"}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Pets</div>
            </div>
          </div>

          {/* Video Section */}
          {house.videoUrl && (() => {
            const getEmbedUrl = (url) => {
              if (!url) return null;
              // Handle standard youtube.com/watch?v=ID, youtu.be/ID, and shorts
              const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
              const match = url.match(regExp);
              const id = (match && match[7].length === 11) ? match[7] : null;

              if (!id) {/* console.warn("Video URL parsing failed:", url, "Match:", match); */}
              return id ? `https://www.youtube.com/embed/${id}` : null;
            };
            const embedUrl = getEmbedUrl(house.videoUrl);

            return embedUrl ? (
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                 <h2 className="text-2xl font-serif font-bold p-6 pb-2">Property Video Tour</h2>
                 <div className="relative pt-[56.25%] bg-black">
                   <iframe
                     src={embedUrl}
                     title="Property Video"
                     className="absolute inset-0 w-full h-full"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 </div>
              </div>
            ) : null;
          })()}

          {/* Description */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">About this property</h2>
            <p className="text-muted-foreground leading-relaxed text-lg font-light whitespace-pre-line">
              {house.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(house.amenities || []).map((amenity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-sm" />
                  </div>
                  <span className="text-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="border-t border-border pt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold">Guest Reviews</h2>
              <div className="flex items-center gap-2 text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <span className="font-bold text-foreground">{house.comments?.length || 0} Reviews</span>
              </div>
            </div>

            <div className="space-y-6">
              {house.comments?.length ? (
                house.comments.map((c, i) => (
                  <div key={i} className="bg-secondary/5 p-6 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                          {c.username ? c.username[0].toUpperCase() : "G"}
                        </div>
                        <div>
                          <div className="font-bold">{c.username || "Guest"}</div>
                          <div className="text-xs text-gray-500">Verified User</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(c.rating || 5)].map((_, idx) => (
                          <FontAwesomeIcon key={idx} icon={faStar} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{c.text}"</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-secondary/5 rounded-2xl border border-dashed border-border">
                  <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="mt-8 bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(num)}
                      className={`text-2xl transition-colors ${num <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with this property..."
                  className="w-full bg-background border border-input rounded-lg p-4 min-h-[120px] focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-4 bg-primary text-black font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🧊 Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-border shadow-xl">
              <div className="flex items-end justify-between mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">₦{displayPrice?.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/ {house.durationType === "short" ? "night" : "year"}</span>
                  </div>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                     <FontAwesomeIcon icon={faStar} />
                     <span>4.8</span>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  disabled={house.isAvailable === false}
                  onClick={() => window.open(`https://wa.me/${house.user.whatsapp}`, "_blank")}
                  className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${house.isAvailable !== false ? "bg-[#25D366] hover:bg-[#20bd5a] text-white hover:scale-[1.02]" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                  {house.isAvailable !== false ? "Chat on WhatsApp" : "Unavailable"}
                </button>

                <button
                  disabled={house.isAvailable === false}
                  onClick={() => (window.location.href = `tel:${house.user.phone}`)}
                  className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all border border-border ${house.isAvailable !== false ? "bg-secondary hover:bg-secondary/80 text-foreground" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  {house.isAvailable !== false ? "Call Host" : "Unavailable"}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-black font-bold text-xl">
                    {house.companyName ? house.companyName[0] : "H"}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{house.companyName || "Private Host"}</div>
                    <div className="text-xs text-muted-foreground">Joined {new Date(house.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-6 rounded-2xl border border-border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldAlt} className="text-primary" />
                Safety First
              </h3>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary">•</span> Inspect the property in person before paying.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> Meet in a safe, public location.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> CMHousing is not liable for transactions.
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                    onClick={() => {
                        if(!isLogin) {
                            toast.error("Please login to report a listing.");
                            return;
                        }
                        const reason = prompt("Please provide a reason for reporting this listing:");
                        if(reason) {
                            API.post('/reports', {
                                targetType: 'House',
                                targetId: house._id,
                                reason: reason
                            })
                            .then(() => toast.success("Report submitted successfully. We will investigate."))
                            .catch(err => toast.error("Failed to submit report."));
                        }
                    }}
                    className="w-full py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faShieldAlt} />
                    Report this Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      {similarHouses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-border mt-12">
          <h2 className="text-3xl font-serif font-bold mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarHouses.slice(0, 4).map((h) => (
              <div key={h._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                <HouseListing {...h} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border md:hidden z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Price</span>
            <div className="font-bold text-lg text-primary">₦{displayPrice?.toLocaleString()}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`https://wa.me/${house.user.whatsapp}`, "_blank")}
              className="bg-[#25D366] text-white p-3 rounded-full shadow-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
            </button>
            <button
              onClick={() => (window.location.href = `tel:${house.user.phone}`)}
              className="bg-primary text-black p-3 rounded-full shadow-lg"
            >
              <FontAwesomeIcon icon={faPhone} className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
