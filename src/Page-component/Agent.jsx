import { useEffect, useState } from "react";
import API from "@/api/axios";
import { useAxiosAuth } from "@/Authentication/useAxiosAuth";

export default function HouseRegister() {
  useAxiosAuth()
  const [profileCompleted, setProfileCompleted] = useState(null);
  const [formData, setFormData] = useState({
    houseType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    rentPrice: "",
    description: "",
  });
  const [houseImages, setHouseImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      try {
        const res = await API.get("/business-profile/me");
        console.log(res)
        setProfileCompleted(res.data?.isCompleted || false);
      } catch (err) {
        console.error(err);
        setProfileCompleted(false);
      }
    }
    checkProfile();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleHouseImagesUpload(e) {
    setHouseImages(Array.from(e.target.files));
  }

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    setUploading(true);

    if (!houseImages || houseImages.length === 0) {
      alert('Please attach at least one image');
      setUploading(false);
      return;
    }

    // 1) Upload each file to our backend which uploads to Cloudinary
    const uploadedUrls = [];
    for (const file of houseImages) {
      const form = new FormData();
      form.append('image', file);

      // Using your API axios instance so auth header is applied
      const resp = await API.post('/houses/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      uploadedUrls.push(resp.data.url);
    }

    // 2) Create house record (server side will use req.user already)
    await API.post('/houses/create', {
      ...formData,
      images: uploadedUrls,
    });

    alert('House listed successfully!');
    setFormData({
      houseType: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      rentPrice: '',
      description: '',
    });
    setHouseImages([]);
  } catch (err) {
    console.error('Upload failed:', err);
    const msg = err?.response?.data?.message || err?.message || 'Failed to list house';
    alert(msg);
  } finally {
    setUploading(false);
  }
}


  if (profileCompleted === null) return <p>Loading...</p>;

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

  return (
    <div className="w-[80%] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">List Your House</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          id="houseType"
          value={formData.houseType}
          onChange={handleChange}
          placeholder="House Type"
          required
        />
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          id="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          required
        />
        <input
          type="number"
          id="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          required
        />
        <input
          type="number"
          id="rentPrice"
          value={formData.rentPrice}
          onChange={handleChange}
          placeholder="Rent Price (₦)"
          required
        />
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="col-span-2 border p-2 rounded"
        ></textarea>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          onChange={handleHouseImagesUpload}
          required
          className="col-span-2"
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
