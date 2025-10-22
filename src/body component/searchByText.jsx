import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { houseDetailsFormatter } from "@/utils/houseDetailsFormatter";
import HouseListing from "@/shortlet/shortlet-house";
import useDebounce from "@/hooks/useDebounce";

export default function TextSearchFilter() {
  const { fetchHouses } = useLoginAuth();
  const [query, setQuery] = useState("");
  const [houses, setHouses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounce input to prevent spam requests
  const debouncedQuery = useDebounce(query, 1500);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      // reset when cleared
      setHouses([]);
      setHasSearched(false);
      return;
    }

    async function search() {
      setLoading(true);
      try {
        const filters = { search: debouncedQuery };
        const { formated } = await fetchHouses({ filters, type: "search" });
        setHouses(formated||[]);
        setHasSearched(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [debouncedQuery]);

  return (
    <div className="my-8 w-full text-center">
      {/* 🔍 Search input */}
      <div className="relative flex justify-center items-center mx-auto w-[90%] md:w-[60%]">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 text-gray-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="house type, locations, or Agent..."
          className="pl-10 pr-4 py-2 w-full rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700"
        />
      </div>

      {/* 🔄 Results section */}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500 italic">Searching...</p>
        ) : Array.isArray(houses) && houses.length > 0 ? (
          <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-5 sm:gap-y-6 gap-6">
            {houses.map((house, index) => (
              <HouseListing key={index} {...house} />
            ))}
          </div>
        ) : hasSearched ? (
          <p className="text-gray-400 italic">No results found.</p>
        ) : (
          <p className="text-gray-400 italic mt-3">
            Type to search houses, locations, or companies.
          </p>
        )}
      </div>
    </div>
  );
}
