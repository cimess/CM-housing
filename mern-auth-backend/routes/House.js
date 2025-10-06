// routes/House.js
const express = require("express");
const House = require("../models/House");
const BusinessProfile = require("../models/businessProfile");
const authMiddleware = require("../middleware/authenticate");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const rateLimit = require("express-rate-limit");
const cloudinary = require("../config/cloudinary");
const router = express.Router();
const { addComment, toggleLike, getHouseDetails } = require("../controllers/HouseController");
const authenticate = require("../middleware/authenticate");






// ============================
// Multer + Sharp Config
// ============================
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type. Only JPEG, PNG, WebP allowed."));
  },
});

// Rate limit for uploads
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { message: "Maximum of 10 pictures allowed for upload.... Upgrade to Premium for more" },
});

// ============================
// UPLOAD route -> POST /api/houses/upload
// ============================
router.post(
  "/upload",
  authMiddleware,
  uploadLimiter,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file attached" });

      const img = sharp(req.file.buffer);
      const meta = await img.metadata();

      // Optional minimum quality check
      if ((meta.width && meta.width < 300) || (meta.height && meta.height < 300)) {
        return res.status(400).json({ message: "Image too small (min 300x300)" });
      }

      // Process with sharp
      const processedBuffer = await img
        .rotate()
        .resize({ width: 2048, height: 2048, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

      const publicId = `housing_images/${uuidv4()}`;

      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "housing_images",
            public_id: publicId,
            resource_type: "image",
            overwrite: false,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(processedBuffer);
      });

      res.json({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
      });
    } catch (err) {
      console.error("Upload error", err);
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  }
);

// ============================
// CREATE HOUSE route -> POST /api/houses/create
// ============================
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // user document attached by auth middleware

    // Check if business profile exists and is completed
    const profile = await BusinessProfile.findOne({ user: userId });
    if (!profile || !profile.isCompleted) {
      return res.status(403).json({ message: "Complete your business profile before listing a house" });
    }

    // destructure important fields
    const {
      roleOfLister,
      companyName,
      consultationFee,
      durationType,
      maxDuration,
      pricePerNight,
      rentPrice,
      houseType,
      location,
      bedrooms,
      bathrooms,
      images,
      petAllowed,
      furnished,
      amenities,
      description,
      alt,
    } = req.body;
    // Basic required validation
    if (!roleOfLister || !["agent", "landlord"].includes(roleOfLister)) {
      return res.status(400).json({ message: "roleOfLister is required and must be 'agent' or 'landlord'" });
    }

    if (!durationType || !["short", "long"].includes(durationType)) {
      return res.status(400).json({ message: "durationType is required and must be 'short' or 'long'" });
    }

    if (!houseType || !location || !bedrooms || !bathrooms) {
      return res.status(400).json({ message: "houseType, location, bedrooms and bathrooms are required" });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // duration-specific validation
    if (durationType === "short") {
      if (!pricePerNight) return res.status(400).json({ message: "Short-let requires pricePerNight" });
      if (maxDuration && Number(maxDuration) > 6) return res.status(400).json({ message: "Short-let max duration is 6 months" });
    } else if (durationType === "long") {
      if (!rentPrice) return res.status(400).json({ message: "Long-let requires rentPrice" });
    }

    // agent-specific validation
    if (roleOfLister === "agent") {
      // if companyName missing, try to auto-fill from business profile
      const companyToUse = companyName || profile.company || undefined;
      if (!companyToUse) {
        return res.status(400).json({ message: "Agent listings must include a companyName (or set in business profile)" });
      }
      if (!consultationFee && Number(consultationFee) !== 0) {
        return res.status(400).json({ message: "Agent listings must include consultationFee (0 allowed)" });
      }
    }

    // Build house doc
    const houseDoc = {
      user: userId,
      roleOfLister,
      companyName: roleOfLister === "agent" ? (companyName || profile.company) : undefined,
      consultationFee: roleOfLister === "agent" ? Number(consultationFee || 0) : 0,
      durationType,
      maxDuration: durationType === "short" ? (maxDuration ? Number(maxDuration) : undefined) : undefined,
      pricePerNight: durationType === "short" ? (pricePerNight ? Number(pricePerNight) : undefined) : undefined,
      rentPrice: durationType === "long" ? (rentPrice ? Number(rentPrice) : undefined) : undefined,
      houseType,
      location,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      description: description || "",
      petAllowed: !!petAllowed,
      furnished: !!furnished,
      amenities: Array.isArray(amenities) ? amenities : (amenities ? [amenities] : []),
      images,
      alt: alt || "house image",
    };

    const house = new House(houseDoc);
    await house.save();

    return res.status(201).json({ message: "House listed", house });
  } catch (err) {
    console.error("create house error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


// GET ALL HOUSES -> GET /api/houses
// Supports query filters like ?durationType=short&state=Lagos&lga=Ikeja&town=Ojodu
router.get("/", async (req, res) => {
  try {
    const { durationType, state, lga, town, roleOfLister } = req.query;
    const filter = {};

    if (durationType) filter.durationType = durationType;
    if (state) filter["location.state"] = new RegExp(state, "i");
    if (lga) filter["location.lga"] = new RegExp(lga, "i");
    if (town) filter["location.town"] = new RegExp(town, "i");
    if (roleOfLister) filter.roleOfLister = roleOfLister;

    const houses = await House.find(filter).populate("user", "name email");
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const houses = await House.find({ user: userId });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ============================
// GET ONE HOUSE -> GET /api/houses/:id
// ============================
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    const house = await House.findById(id).populate("user", "name email");
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




router.post("/:id/comment", authenticate, addComment);
router.post("/:id/like", authenticate, toggleLike);
router.get("/:id/details", getHouseDetails);


module.exports = router;
