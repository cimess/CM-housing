import { useEffect, useState } from "react";
import { toast } from "sonner";
import API from "@/api/axios";
import Input from "@/body component/input-component";
import LoadingAnimation from "@/animations/LoadingAnim";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function EditHousePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLogin, refreshHouses } = useLoginAuth();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [houseImages, setHouseImages] = useState([]); // New files to upload
  const [newAmenity, setNewAmenity] = useState("");

  const [formData, setFormData] = useState({
    roleOfLister: "landlord",
    companyName: "",
    consultationFee: 0,
    durationType: "long",
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
    videoUrl: "",
    alt: "a picture of a room",
    images: [], // Existing image URLs
  });

  const SHORT_AMENITIES = ["Wi-Fi", "TV", "Housekeeping", "Air conditioning"];
  const LONG_AMENITIES = ["Kitchen", "Parking", "Security", "Laundry-space"];

  // Fetch House Details
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
      return;
    }

    async function fetchHouse() {
      try {
        setLoading(true);
        const res = await API.get(`/houses/${id}`);
        const house = res.data;
        console.log("Fetched House Data:", house); // DEBUG


        setFormData({
            roleOfLister: house.roleOfLister || "landlord",
            companyName: house.companyName || "",
            consultationFee: house.consultationFee || 0,
            durationType: house.durationType || "long",
            pricePerNight: house.pricePerNight || "",
            maxDuration: house.maxDuration || 1,
            rentPrice: house.rentPrice || "",
            houseType: house.houseType || "",
            location: {
                state: house.location?.state || "",
                lga: house.location?.lga || "",
                town: house.location?.town || "",
                address: house.location?.address || "",
            },
            bedrooms: house.bedrooms || "",
            bathrooms: house.bathrooms || "",
            description: house.description || "",
            petAllowed: house.petAllowed || false,
            furnished: house.furnished || false,
            amenities: house.amenities || [],
            videoUrl: house.videoUrl || "",
            alt: house.alt || "house image",
            images: house.images || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load property details");
        navigate("/MyAdvertComponent");
      }
    }
    fetchHouse();
  }, [id, isLogin, navigate]);

  function handleChange(e) {
    const { id, value, type, checked } = e.target;
    if (id.startsWith("loc-")) {
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

  // Remove existing image from state
  function removeExistingImage(urlToRemove) {
    if (confirm("Remove this image? (Changes saved on Submit)")) {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(url => url !== urlToRemove)
        }));
    }
  }

  function handleHouseImagesUpload(e) {
    setHouseImages(Array.from(e.target.files));
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to PERMANENTLY delete this listing?")) return;
    try {
        setUploading(true);
        await API.delete(`/houses/${id}`);
        refreshHouses();
        toast.success("Listing deleted");
        navigate("/MyAdvertComponent");
    } catch (err) {
        console.error("Delete error", err);
        toast.error("Failed to delete");
    } finally {
        setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setUploading(true);

      // Upload NEW images
      const newUploadedUrls = [];
      if (houseImages.length > 0) {
        for (const file of houseImages) {
          const form = new FormData();
          form.append("image", file);
          const resp = await API.post("/houses/upload", form, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          newUploadedUrls.push(resp.data.url);
        }
      }

      // Combine existing images + new images
      const finalImages = [...formData.images, ...newUploadedUrls];

      if (finalImages.length === 0) {
        toast.error("You must have at least one image.");
        setUploading(false);
        return;
      }

      const payload = {
        ...formData,
        consultationFee: Number(formData.consultationFee),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        rentPrice: formData.durationType === "long" ? Number(formData.rentPrice || 0) : undefined,
        pricePerNight: formData.durationType === "short" ? Number(formData.pricePerNight || 0) : undefined,
        maxDuration: formData.durationType === "short" ? Number(formData.maxDuration || 1) : undefined,
        images: finalImages,
      };

      await API.put(`/houses/${id}`, payload);
      toast.success("Property updated successfully!");

      refreshHouses();
      navigate("/MyAdvertComponent");

    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.response?.data?.message || "Failed to update property");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <LoadingAnimation />;

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate("/MyAdvertComponent")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
            </button>
            <h1 className="text-2xl font-serif font-bold">Edit Property</h1>
            <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-end">
            <Link
                to={`/house/${id}`}
                target="_blank"
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg transition-colors"
            >
                <FontAwesomeIcon icon={faEye} /> View Live Page
            </Link>
            <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white px-4 py-2 rounded-lg transition-colors border border-destructive/20"
            >
                <FontAwesomeIcon icon={faTrash} /> Delete Property
            </button>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Basic Info */}
                <div className="md:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg border-b border-border pb-2">Basic Information</h3>
                </div>

                <label className="md:col-span-2">
                <div className="font-semibold mb-1">Duration Type</div>
                <select
                    id="durationType"
                    value={formData.durationType}
                    onChange={handleChange}
                    className="w-full rounded-xl px-3 py-2 border bg-background"
                >
                    <option value="long">Long-let</option>
                    <option value="short">Short-let</option>
                </select>
                </label>

                {formData.durationType === "short" ? (
                <>
                    <Input type="number" id="pricePerNight" value={formData.pricePerNight} onChange={handleChange} label="Price Per Night (₦)" />
                    <Input type="number" id="maxDuration" value={formData.maxDuration} onChange={handleChange} label="Max Duration (months)" />
                </>
                ) : (
                <Input type="number" id="rentPrice" value={formData.rentPrice} onChange={handleChange} label="Rent Price (₦)" />
                )}

                <Input type="text" id="houseType" value={formData.houseType} onChange={handleChange} label="House Type" required />

                {/* Location */}
                <div className="md:col-span-2 space-y-4 mt-4">
                    <h3 className="font-bold text-lg border-b border-border pb-2">Location</h3>
                </div>
                <Input type="text" id="loc-state" value={formData.location.state} onChange={handleChange} label="State" />
                <Input type="text" id="loc-lga" value={formData.location.lga} onChange={handleChange} label="LGA" />
                <Input type="text" id="loc-town" value={formData.location.town} onChange={handleChange} label="Town" />
                <Input type="text" id="loc-address" value={formData.location.address} onChange={handleChange} label="Street Address" />

                {/* Specs */}
                <div className="md:col-span-2 space-y-4 mt-4">
                    <h3 className="font-bold text-lg border-b border-border pb-2">Details</h3>
                </div>
                <Input type="number" id="bedrooms" value={formData.bedrooms} onChange={handleChange} label="Bedrooms" required />
                <Input type="number" id="bathrooms" value={formData.bathrooms} onChange={handleChange} label="Bathrooms" required />

                <div className="md:col-span-2">
                    <label className="font-semibold block mb-1">Description</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl bg-background min-h-[100px]"
                    />
                </div>

                <div className="md:col-span-2">
                    <Input type="url" id="videoUrl" value={formData.videoUrl} onChange={handleChange} label="YouTube Video Link" placeholder="https://youtube.com/..." />
                </div>

                {/* Amenities */}
                <div className="md:col-span-2 mt-4">
                    <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Amenities</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                        {(formData.durationType === "short" ? SHORT_AMENITIES : LONG_AMENITIES).map((am) => (
                            <label key={am} className="flex items-center gap-2 cursor-pointer bg-secondary/30 px-3 py-1 rounded-full hover:bg-secondary/50 transition-colors">
                                <input type="checkbox" checked={formData.amenities.includes(am)} onChange={() => toggleAmenity(am)} className="rounded" />
                                {am}
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input type="text" value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} placeholder="Add custom amenity" className="border rounded-lg px-3 py-2 flex-1 bg-background" />
                        <button type="button" onClick={addCustomAmenity} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90">Add</button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {formData.amenities.map((am) => (
                        <span key={am} className="inline-flex items-center bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full">
                            {am}
                            <button type="button" onClick={() => removeAmenity(am)} className="ml-2 text-destructive hover:text-red-700 font-bold">×</button>
                        </span>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="md:col-span-2 mt-4">
                    <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Images</h3>

                    {/* Existing Images */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {formData.images.map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden h-32 border border-border">
                                <img src={url} alt="property" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(url)}
                                    className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove Image"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <label className="block mb-2 font-semibold">Add New Images</label>
                    <input type="file" multiple accept=".jpg,.jpeg,.png,.webp" onChange={handleHouseImagesUpload} className="w-full border px-3 py-2 rounded-xl bg-background" />
                </div>

                <div className="md:col-span-2 pt-6">
                    <button type="submit" disabled={uploading} className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                        {uploading ? "Saving Changes..." : "Update Property"}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
