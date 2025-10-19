import { useEffect, useState } from "react";
import API from "@/api/axios";
import Input from "@/body component/input-component";
import LoadingAnimation from "@/animations/LoadingAnim";
import { useNavigate } from "react-router-dom";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";


export default function HouseRegister() {
  const navigate = useNavigate();

const {isLogin}=useLoginAuth()
  const [profileCompleted, setProfileCompleted] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [houseImages, setHouseImages] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");


  useEffect(()=>{
if(!isLogin)return navigate('/')

},[isLogin,navigate])

  const [formData, setFormData] = useState({
    roleOfLister: "landlord",
    companyName: "",
    consultationFee: 0,

    durationType: "long", // short | long
    pricePerNight: "",
    maxDuration: 1,
    rentPrice: "",

    houseType: "",
    location: {
      state: "",
      lga: "",
      town: "",
      address: "",
    },

    bedrooms: "",
    bathrooms: "",
    description: "",
    petAllowed: false,
    furnished: false,
    amenities: [],

    alt: "a picture of a room",
  });

  const SHORT_AMENITIES = ["Wi-Fi", "TV", "Housekeeping", "Air conditioning"];
  const LONG_AMENITIES = ["Kitchen", "Parking", "Security", "Laundry-space"];

  // Profile check
  useEffect(() => {
    async function checkProfile() {
      try {
        const res = await API.get("/business-profile/me");
        setProfileCompleted(res.data?.isCompleted || false);

        if (res.data?.company) {
          setFormData((prev) => ({ ...prev, companyName: res.data.company }));
        }
      } catch (err) {
        console.error("profile check error:", err);
        setProfileCompleted(false);
      }
    }
    checkProfile();
  }, []);

  // Auto-set recommended amenities
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amenities:
        formData.durationType === "short" ? SHORT_AMENITIES : LONG_AMENITIES,
    }));
  }, [formData.durationType]);

  function handleChange(e) {
    const { id, value, type, checked } = e.target;
    if (id.startsWith("loc-")) {
      // location update
      const key = id.split("loc-")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
      return;
    }
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function toggleAmenity(amenity) {
    setFormData((prev) => {
      const next = new Set(prev.amenities || []);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return { ...prev, amenities: Array.from(next) };
    });
  }

  function addCustomAmenity() {
    if (!newAmenity.trim()) return;
    setFormData((prev) => ({
      ...prev,
      amenities: [...new Set([...prev.amenities, newAmenity.trim()])],
    }));
    setNewAmenity("");
  }

  function removeAmenity(amenity) {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((am) => am !== amenity),
    }));
  }

  function handleHouseImagesUpload(e) {
    setHouseImages(Array.from(e.target.files));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setUploading(true);

      if (!houseImages.length) {
        alert("Please attach at least one image");
        return;
      }

      if (formData.durationType === "short") {
        if (!formData.pricePerNight) {
          alert("Enter price per night for short-let");
          return;
        }
        if (Number(formData.maxDuration) > 6) {
          alert("Max duration for short-let is 6 months");
          return;
        }
      } else {
        if (!formData.rentPrice) {
          alert("Enter rent price for long-let");
          return;
        }
      }

      // Upload images
      const uploadedUrls = [];
      for (const file of houseImages) {
        const form = new FormData();
        form.append("image", file);
        const resp = await API.post("/houses/upload", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedUrls.push(resp.data.url);
      }

      const payload = {
        ...formData,
        consultationFee:
          formData.roleOfLister === "agent"
            ? Number(formData.consultationFee)
            : 0,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        rentPrice:
          formData.durationType === "long"
            ? Number(formData.rentPrice || 0)
            : undefined,
        pricePerNight:
          formData.durationType === "short"
            ? Number(formData.pricePerNight || 0)
            : undefined,
        maxDuration:
          formData.durationType === "short"
            ? Number(formData.maxDuration || 1)
            : undefined,
        images: uploadedUrls,
      };

      await API.post("/houses/create", payload);
      alert("House listed successfully!");
      setFormData((prev) => ({
        ...prev,
        houseType: "",
        location: { state: "", lga: "", town: "", address: "" },
        bedrooms: "",
        bathrooms: "",
        description: "",
        pricePerNight: "",
        rentPrice: "",
        maxDuration: 1,
        amenities: [],
      }));
      setHouseImages([]);
      navigate("/loading", { state: { redirectTo: "/" } });
    } catch (err) {
      console.error("Upload failed:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to list house";
      alert(msg);
    } finally {
      setUploading(false);
    }
  }

  if (profileCompleted === null) return <LoadingAnimation />;

  if (!profileCompleted) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">⚠️ Complete Your Profile First</h2>
        <p className="text-gray-600 mb-4">
          You need to complete your profile before listing a house.
        </p>
        <a href="/profile" className="bg-black text-white px-4 py-2 rounded">
          Go to Profile
        </a>
      </div>
    );
  }

  // Form
  return (
    <div className="w-[80%] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">List Your House</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Who is listing */}
        <label className="col-span-2">
          <div className="font-semibold">Who are you?</div>
          <select
            id="roleOfLister"
            value={formData.roleOfLister}
            onChange={handleChange}
            className="w-full border rounded-xl px-2 mt-2"
          >
            <option value="landlord">Landlord</option>
            <option value="agent">Agent</option>
          </select>
        </label>

        {/* Agent extra fields */}
        {formData.roleOfLister === "agent" && (
          <>
            <Input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              label="Company Name"
              className="col-span-2"
              required
            />
            <Input
              type="number"
              id="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              label="Consultation Fee (₦)"
              className="col-span-2"
              required
            />
          </>
        )}

        {/* Duration */}
        <label className="col-span-2">
          <div className="font-semibold">Duration type</div>
          <select
            id="durationType"
            value={formData.durationType}
            onChange={handleChange}
            className="w-full rounded-xl px-2 mt-2 border"
          >
            <option value="long">Long-let</option>
            <option value="short">Short-let</option>
          </select>
        </label>

        {/* Short vs long fields */}
        {formData.durationType === "short" ? (
          <>
            <Input
              type="number"
              id="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              label="Price Per Night (₦)"
            />
            <Input
              type="number"
              id="maxDuration"
              value={formData.maxDuration}
              onChange={handleChange}
              label="Max Duration (months, ≤6)"
            />
          </>
        ) : (
          <Input
            type="number"
            id="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            label="Rent Price (₦)"
          />
        )}

        {/* House info */}
        <Input
          type="text"
          id="houseType"
          value={formData.houseType}
          onChange={handleChange}
          label="House Type"
          required
        />

        <Input
          type="text"
          id="loc-state"
          value={formData.location.state}
          onChange={handleChange}
          label="State"
          className="col-span-2"
        />

         <Input
          type="text"
          id="loc-lga"
          value={formData.location.lga}
          onChange={handleChange}
          label="Local government area"
          className="col-span-2"
        />

        <Input
          type="text"
          id="loc-town"
          value={formData.location.town}
          onChange={handleChange}
          label="Town"
          className="col-span-2"
        />

        <Input
          type="text"
          id="loc-address"
          value={formData.location.address}
          onChange={handleChange}
          label="Street Address"
          className="col-span-2"
        />

        {/* Beds + baths */}
        <Input
          type="number"
          id="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          label="Bedrooms"
          required
        />
        <Input
          type="number"
          id="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          label="Bathrooms"
          required
        />

        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="col-span-2 border p-2 rounded"
        />

        {/* Amenities */}
        <div className="col-span-2">
          <p className="font-semibold mb-1">Recommended Amenities</p>
          {(formData.durationType === "short"
            ? SHORT_AMENITIES
            : LONG_AMENITIES
          ).map((am) => (
            <label key={am} className="mr-3">
              <input
                type="checkbox"
                checked={formData.amenities.includes(am)}
                onChange={() => toggleAmenity(am)}
              />{" "}
              {am}
            </label>
          ))}

          <div className="mt-3 flex">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="Add custom amenity"
              className="border rounded px-2 flex-1"
            />
            <button
              type="button"
              onClick={addCustomAmenity}
              className="ml-2 px-3 bg-gray-800 text-white rounded"
            >
              Add
            </button>
          </div>

          <div className="mt-2 flex flex-wrap">
            {formData.amenities.map((am) => (
              <span
                key={am}
                className="inline-flex items-center bg-gray-200 text-sm px-2 py-1 rounded mr-2 mb-2"
              >
                {am}
                <button
                  type="button"
                  onClick={() => removeAmenity(am)}
                  className="ml-2 text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          onChange={handleHouseImagesUpload}
          required
          className="col-span-2 border px-2 border-black rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-black text-white py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
