const express = require("express");
const House = require("../models/House");
const authMiddleware = require("../middleware/authenticate");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const rateLimit = require("express-rate-limit");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

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
  max: 6,
  message: { message: "Too many upload requests, slow down." },
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
    const {
      houseType,
      location,
      bedrooms,
      bathrooms,
      rentPrice,
      description,
      images,
    } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const house = new House({
      user: req.user._id,
      houseType,
      location,
      bedrooms,
      bathrooms,
      rentPrice,
      description,
      images,
    });

    await house.save();
    res.json({ message: "House listed successfully!", house });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// GET ALL HOUSES -> GET /api/houses
// ============================
router.get("/", async (req, res) => {
  try {
    const houses = await House.find().populate("user", "name email"); // populate to show owner info if you want
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// GET ONE HOUSE -> GET /api/houses/:id
// ============================
router.get("/:id", async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate("user", "name email");
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
