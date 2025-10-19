const House = require("../models/House");
const BusinessProfile = require("../models/businessProfile");

exports.createHouse = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check profile
    const profile = await BusinessProfile.findOne({ user: userId });
    if (!profile || !profile.isCompleted) {
      return res.status(403).json({ message: "Complete your profile before listing a house" });
    }

    const {
      roleOfLister,
      companyName,
      consultationFee,
      durationType,
      rentPrice,
      pricePerNight,
      maxDuration,
    } = req.body;

    // Validate based on durationType
    if (durationType === "short") {
      if (!pricePerNight) return res.status(400).json({ message: "Short-let requires pricePerNight" });
      if (maxDuration > 6) return res.status(400).json({ message: "Short-let max duration is 6 months" });
    }
    if (durationType === "long" && !rentPrice) {
      return res.status(400).json({ message: "Long-let requires rentPrice" });
    }

    // If agent, require company + fee
    if (roleOfLister === "agent" && (!companyName || !consultationFee)) {
      return res.status(400).json({ message: "Agent listings must include companyName & consultationFee" });
    }

    const house = new House({ ...req.body, user: userId });
    await house.save();

    return res.status(201).json({ message: "House listed", house });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getMyHouses = async (req, res) => {
  try {
    const { userId } = req.user;
    const houses = await House.find({ user: userId });
    return res.json(houses);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const { id } = req.params;
    const user = req.user;

    const house = await House.findById(id);
    if (!house) return res.status(404).json({ msg: "House not found" });

    // Add comment
    house.comments.push({
      user: user._id,
      username: user.username || user.email,
      text,
      rating,
    });

    // Recalculate rating
    const totalRatings = house.comments.length;
    house.averageRating =
      house.comments.reduce((acc, c) => acc + (c.rating || 0), 0) / totalRatings;
    house.totalRatings = totalRatings;

    await house.save({ validateModifiedOnly: true }); // ✅ FIX HERE

    res.status(200).json({ msg: "Comment added", house });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getMyFeedback=async(req,res)=>{

  try{
   const userId=req.user._id;

   const houses=await House.find({user:userId})
   .populate('comments.user','username email')
   .select('title location comments averageRating totalRatings');

   const feedback =houses.flatMap((house)=>house.comments.map((comment)=>({
    houseId:house._id,
    houseTitle:house.title,
    location:house.location,
    averageRating:house.averageRating,
    ...comment.toObject()
   })))

   res.status(200).json(feedback)
  }catch(err){
console.log("❌ getMyFeedback error:", err);
res.status(500).json({message:"server error",error:err.message})
  }
}


exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const house = await House.findById(id);
    if (!house) return res.status(404).json({ msg: "House not found" });

    const index = house.likes.findIndex(
      like => like.user.toString() === userId.toString()
    );

    if (index >= 0) {
      house.likes.splice(index, 1); // Unlike
    } else {
      house.likes.push({ user: userId }); // Like
    }

    await house.save({ validateBeforeSave: false }); // ✅ skip full validation

    res.status(200).json({ likesCount: house.likes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};



exports.getHouseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id)
      .populate("user", "username email phone whatsapp")
      .populate("comments.user", "username email");

    if (!house) return res.status(404).json({ msg: "House not found" });

    res.status(200).json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
