import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import HouseListing from "@/shortlet/shortlet-house";
import useDebounce from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

export default function TextSearchFilter() {
  const { fetchHouses } = useLoginAuth();
  const [query, setQuery] = useState("");
  const [houses, setHouses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Debounce input to prevent spam requests
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setHouses([]);
      setHasSearched(false);
      return;
    }

    async function search() {
      setLoading(true);
      try {
        const filters = { search: debouncedQuery };
        const { formated } = await fetchHouses({ filters, type: "search" });
        setHouses(formated || []);
        setHasSearched(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [debouncedQuery]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto relative z-40" ref={containerRef}>
      {/* 🔍 Glass Search Pill */}
      <div
        className={`
          glass-panel rounded-full p-2 flex items-center transition-all duration-300
          ${isFocused ? "ring-2 ring-primary/50 bg-black/40" : "bg-black/20 hover:bg-black/30"}
        `}
      >
        <div className="pl-6 text-gray-400">
          <FontAwesomeIcon icon={faSearch} className="text-lg" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search by location, type, or agent..."
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white placeholder:text-white/60 px-4 py-3 text-lg font-light"
        />

        {query && (
          <button
            onClick={() => { setQuery(""); setHouses([]); setIsFocused(false); }}
            aria-label="Clear search"
            className="text-gray-400 hover:text-white px-3 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        <button className="magnetic-btn hidden sm:block">
          Search
        </button>
      </div>

      {/* 🔄 Results Dropdown */}
      <AnimatePresence>
        {(isFocused && (hasSearched || loading || query.length > 1)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 glass-panel-light dark:glass-panel rounded-3xl overflow-hidden max-h-[70vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-10 space-x-3 text-gray-500">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              ) : houses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {houses.map((house, index) => (
                    <div key={index} className="transform scale-90 hover:scale-100 transition-transform origin-top-left">
                       <HouseListing {...house} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-lg">No properties found matching "{query}"</p>
                  <p className="text-sm mt-2">Try checking your spelling or using different keywords.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

