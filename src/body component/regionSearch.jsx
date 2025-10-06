import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { location } from "@/assets/exportLocation";

export default function Region({ setRegionClick, onSearch }) {
  const states = location.country.Nigeria.state;

  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedTown, setSelectedTown] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Pass result upwards only on button click
    onSearch({
      state: selectedState,
      lga: selectedLga,
      town: selectedTown,
    });
    setRegionClick(false);
  }

  return (
    <div className="flex items-start justify-between absolute translate-y-[80px] left-2 z-98 w-[50%]">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 bg-white w-full rounded pl-2 pr-3 py-3 shadow space-y-3"
      >
        {/* State */}
        <div>
          <label className="block text-sm mb-1">State</label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedLga("");
              setSelectedTown("");
            }}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select State</option>
            {Object.keys(states).map((s) => (
              <option key={s} value={s}>
                {states[s].name}
              </option>
            ))}
          </select>
        </div>

        {/* LGA */}
        {selectedState && (
          <div>
            <label className="block text-sm mb-1">LGA</label>
            <select
              value={selectedLga}
              onChange={(e) => {
                setSelectedLga(e.target.value);
                setSelectedTown("");
              }}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select LGA</option>
              {Object.keys(states[selectedState].lga).map((l) => (
                <option key={l} value={l}>
                  {states[selectedState].lga[l].name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Town */}
        {selectedLga && (
          <div>
            <label className="block text-sm mb-1">Town</label>
            <select
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select Town</option>
              {states[selectedState].lga[selectedLga].towns.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="submit"
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            Search
          </button>

          <button type="button" onClick={() => setRegionClick(false)}>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="text-xl hover:text-red-600"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
