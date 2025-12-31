import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { useState } from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function BoxContainer({ images, state, city, alt, className }) {
  const { fetchHouses, setHouses } = useLoginAuth();
  const [loading, setLoading] = useState(false);

  async function getHousesByState() {
    setLoading(true);

    try {
      const fetchedHouses = await fetchHouses({ state, city });

      if (!fetchedHouses || fetchedHouses.length === 0) {
        toast.warning(`No houses found in ${city}, ${state}. Showing previous listings.`);
        return;
      }

      setHouses(fetchedHouses);
      toast.success(`Showing ${fetchedHouses.length} listings in ${city}, ${state}.`);
    } catch (err) {
      // console.error("Error fetching houses:", err);
      toast.error("Something went wrong while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={getHousesByState}
      disabled={loading}
      className={`group relative w-full h-full min-h-[200px] overflow-hidden rounded-2xl ${className}`}
    >
      {/* Background Image */}
      <img
        src={images}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 text-left w-full">
        <div className="flex items-center gap-2 text-primary text-xs font-medium uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Explore</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-white group-hover:text-primary transition-colors">
          {city}
        </h3>
        <p className="text-gray-300 text-sm">{state}</p>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}
