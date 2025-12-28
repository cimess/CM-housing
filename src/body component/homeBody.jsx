import { useEffect, useState, useRef } from "react";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import BoxContainer from "./box-container";
import lagosimage from '@/assets/images/lagos/lagos.jpg';
import iyanaipaja from '@/assets/images/lagos/iyanaipaja.jpg';
import lekki from '@/assets/images/lagos/lekki.jpg';
import oshodi from '@/assets/images/lagos/oshodi.jpg';
import victoriaisland from '@/assets/images/lagos/victoriaisland.jpg';
import badagry from '@/assets/images/lagos/badagry.jpg';
import sango from '@/assets/images/lagos/sango.jpg';
import HouseListing from "@/shortlet/shortlet-house";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextSearchFilter from "./searchByText";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';

function HandleShortLetAndFullLetListing() {
  const { fullLet, shortLet, houseLoading, fetchHouses, hasMore, houses } = useLoginAuth();

  const loadMoreAll = useRef(null);
  const loadMoreShortLet = useRef(null);
  const loadMoreFullLet = useRef(null);
  const newestRef = useRef(null);
  const scrollRef = useRef(null);

  const [showHouse, setShowHouse] = useState(false);

  useEffect(() => {
    async function loadHouses() {
      if ((!fullLet || fullLet.length === 0) && (!shortLet || shortLet.length === 0) && (!houses || houses.length === 0)) {
        await fetchHouses({ type: 'shortLet', filters: { filter: 'shortLet' } });
        await fetchHouses({ type: 'fullLet', filters: { filter: 'fullLet' } });
        await fetchHouses();
      }
    }
    loadHouses();
  }, []);

  // Keep a ref for houseLoading to access it inside the observer without re-creating it
  const houseLoadingRef = useRef(houseLoading);
  useEffect(() => {
    houseLoadingRef.current = houseLoading;
  }, [houseLoading]);

  useEffect(() => {
    function createObserver(ref, type, filter) {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          // Use ref to check loading state
          if (!entry.isIntersecting || houseLoadingRef.current) return;

          if (!hasMore?.[type]) {
            observer.unobserve(ref.current);
            return;
          }
          await fetchHouses({ type, append: true, filters: filter });
        }, { threshold: 1.0 }
      );
      observer.observe(ref.current);
      return observer;
    }

    const obsAll = createObserver(loadMoreAll, "all", {});
    const obsShort = createObserver(loadMoreShortLet, "shortLet", { filter: "shortLet" });
    const obsFull = createObserver(loadMoreFullLet, "fullLet", { filter: "fullLet" });

    return () => {
      if (obsAll) obsAll.disconnect();
      if (obsShort) obsShort.disconnect();
      if (obsFull) obsFull.disconnect();
    };
  }, [hasMore]); // Removed houseLoading from dependencies

  useEffect(() => {
    const handleScrollHorizontal = async () => {
      const el = scrollRef.current;
      if (!el || !loadMoreAll || !hasMore) return;

      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 50;

      if (nearEnd) {
        await fetchHouses({ type: "all", append: true });
      }
    };

    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScrollHorizontal);
    return () => {
      if (el) el.removeEventListener("scroll", handleScrollHorizontal);
    };
  }, [houseLoading, hasMore]);

  const houseType = showHouse ? fullLet : shortLet;

  function changeHouseButton() {
    setShowHouse((prev) => !prev);
  }

  return (
    <div className="space-y-20">
      {/* Recent Listings Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400" ref={newestRef}>
            Fresh on the Market
          </h2>
          <div className="hidden md:block w-32 h-[1px] bg-border"></div>
        </div>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x"
          >
            {houses.map((house, index) => (
              <div key={index} className="min-w-[300px] md:min-w-[350px] snap-center">
                <HouseListing {...house} />
              </div>
            ))}
            <div ref={loadMoreAll} className="min-w-[50px] flex items-center justify-center">
              {(houseLoading && hasMore.all) && (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          </div>

          {/* Fade edges for scroll indication */}
          <div className="absolute top-0 right-0 bottom-8 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Main Listing Grid */}
      <section className="px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            {showHouse ? "Long-Term Rentals" : "Short-Let Stays"}
          </h2>

          <div className="flex items-center gap-4 glass-panel px-6 py-3 rounded-full self-start md:self-auto">
            <span className={`text-sm font-medium transition-colors ${!showHouse ? "text-primary" : "text-muted-foreground"}`}>Short-Let</span>
            <Switch checked={showHouse} onCheckedChange={changeHouseButton} className="data-[state=checked]:bg-primary" />
            <span className={`text-sm font-medium transition-colors ${showHouse ? "text-primary" : "text-muted-foreground"}`}>Full-Let</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {houseType && houseType.length > 0 ? (
            houseType.map((house, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <HouseListing {...house} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground italic">
              {houseLoading ? "Loading properties..." : "No properties found in this category."}
            </div>
          )}
        </div>

        <div ref={showHouse ? loadMoreFullLet : loadMoreShortLet} className="py-10 flex justify-center">
          {(houseLoading && (showHouse ? hasMore.fullLet : hasMore.shortLet)) && (
            <div className="flex items-center gap-2 text-primary">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Loading more...</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



export default function Body() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>CMHousing | Find Your Dream Home in Nigeria</title>
        <meta name="description" content="Discover the epitome of luxury living in Nigeria's most exclusive locations. From short-lets to permanent residences." />
        <meta property="og:title" content="CMHousing | Premium Real Estate" />
        <meta property="og:description" content="Find your dream home in Nigeria. Short-lets and full-lets available." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>


      {/* 🎥 Cinematic Hero Section */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          <img
            src={lagosimage}
            alt="Luxury Home"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium tracking-wider mb-4 backdrop-blur-sm">
              PREMIUM REAL ESTATE
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight tracking-tight">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary animate-shimmer bg-[length:200%_auto]">
                Dream Home
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the epitome of luxury living in Nigeria's most exclusive locations.
              From short-lets to permanent residences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-2xl mx-auto"
          >
            <TextSearchFilter />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* 🏙️ Popular Cities Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Destinations</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mt-2">Popular Cities</h2>
          </div>
          <button className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            View all locations
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Manually creating a masonry-like feel with col-spans */}
          <div className="col-span-2 row-span-2">
            <BoxContainer images={lekki} state="Lagos" city="Lekki" alt="Lekki Luxury" />
          </div>
          <div className="col-span-1 row-span-1">
            <BoxContainer images={iyanaipaja} state="Lagos" city="Iyanaipaja" alt="Iyanaipaja" />
          </div>
          <div className="col-span-1 row-span-1">
            <BoxContainer images={oshodi} state="Lagos" city="Oshodi" alt="Oshodi" />
          </div>
          <div className="col-span-1 row-span-1">
             <BoxContainer images={iyanaipaja} state="Lagos" city="Victoria Island" alt="VI" />
          </div>
          <div className="col-span-1 row-span-1">
             <BoxContainer images={badagry} state="Lagos" city="Badagry" alt="Badagry" />
          </div>
           <div className="col-span-1 row-span-1">
             <BoxContainer images={victoriaisland} state="Lagos" city="Victoria Island" alt="VI" />
          </div>
           <div className="col-span-1 row-span-1">
             <BoxContainer images={sango} state="Ogun" city="Sango" alt="Sango" />
          </div>
        </div>
      </section>

      {/* 🏠 Listings Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <HandleShortLetAndFullLetListing />
      </div>

    </div>
  );
}
