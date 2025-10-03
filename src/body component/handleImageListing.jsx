

import { useEffect, useState } from "react";
import HouseListing from "@/shortlet/shortlet-house";
import API from "@/api/axios";
import { houseDetailsFormatter } from "@/utils/houseDetailsFormatter";

function HandleHouseListing() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const res = await API.get("/houses"); // axios
        const formatted = res.data.map(houseDetailsFormatter);
        setHouses(formatted);
        console.log(formatted)
      } catch (err) {
        console.error("Error fetching houses:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHouses();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading houses...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {houses.map((house) => (
        <HouseListing
          key={house.id}
          {...house} // spread props (image, price, etc.)
        />
      ))}
    </div>
  );
}

export default HandleHouseListing;
