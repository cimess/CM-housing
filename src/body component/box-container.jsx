import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { useState } from "react";
import { toast } from "sonner"; // ✅ Replaces ShadCN use-toast

export default function BoxContainer({ images, state, city, alt }) {
  const { fetchHouses, setHouses } = useLoginAuth();
  const [loading, setLoading] = useState(false);

  async function getHousesByState() {
    setLoading(true);

    try {
      const fetchedHouses = await fetchHouses({ state, city });

      if (!fetchedHouses || fetchedHouses.length === 0) {
        toast.warning(`No houses found in ${city}, ${state}. Showing previous listings.`);
        return; // ✅ don’t overwrite global state
      }

      // ✅ Update global state
      setHouses(fetchedHouses);

      toast.success(`Showing ${fetchedHouses.length} listings in ${city}, ${state}.`);
      console.log(`Fetched ${fetchedHouses.length} houses in ${state} ${city}`);
    } catch (err) {
      console.error("Error fetching houses:", err);
      toast.error("Something went wrong while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="group w-fit my-3 text-center">
      <button
        className="text-left"
        onClick={getHousesByState}
        disabled={loading}
      >
        <div className="w-[180px] h-[150px] mb-1 md:w-[200px]">
          <img
            src={images}
            alt={alt}
            className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="text-center mt-1 font-medium">
          {state} {city}
        </div>
      </button>

      {loading && (
        <p className="text-gray-400 text-sm italic mt-1">Loading...</p>
      )}
    </div>
  );
}
