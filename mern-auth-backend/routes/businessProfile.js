const express = require("express");
const router = express.Router();
const { saveProfile, getProfile } = require("../controllers/businessProfileController");
const { authenticate } = require("../middleware/auth"); // your JWT middleware

router.post("/save", authenticate, saveProfile);
router.get("/me", authenticate, getProfile);

module.exports = router;
