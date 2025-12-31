const House = require("../models/House");
const BusinessProfile = require("../models/businessProfile");
const redis = require("../config/redis");
const Fuse = require("fuse.js");
const User = require("../models/User");



exports.createHouse = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("DEBUG: createHouse CALLED");
    console.log("DEBUG: req.body:", JSON.stringify(req.body, null, 2));

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
      isAvailable,
      videoUrl, // Extract videoUrl
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

    const house = new House({ ...req.body, user: userId, videoUrl }); // Explicitly include videoUrl
    await house.save();

    // 🚨 Clear cache after saving new data
    await redis.flushall();

    return res.status(201).json({ message: "House listed", house });
  } catch (err) {
    console.error("❌ Error fetching houses:", err);
res.status(500).json({ message: "Server Error", error: err.message, stack: err.stack });

  }
};

exports.updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const house = await House.findById(id);
    if (!house) return res.status(404).json({ message: "House not found" });

    // Authorization check
    const isAdmin = req.user.roles && req.user.roles.includes("admin");
    if (house.user.toString() !== userId.toString() && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this house" });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      house[key] = updates[key];
    });

    // Special handling for videoUrl to allow clearing it (if sent as empty string or null)
    if (updates.videoUrl !== undefined) {
      house.videoUrl = updates.videoUrl;
    }

    await house.save();
    await redis.flushall(); // Clear cache

    res.status(200).json({ message: "House updated", house });
  } catch (err) {
    console.error("❌ Error updating house:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const house = await House.findById(id);
    if (!house) return res.status(404).json({ message: "House not found" });

    console.log("DEBUG: User attempting delete:", req.user);
    console.log("DEBUG: User roles:", req.user.roles);

    // Only the owner (or maybe an admin) can delete
    // Check both 'roles' array and legacy/singular 'role' field
    // Also handle potential manual entry error where roles are "user,admin" in one string
    const userRoles = req.user.roles || [];
    const hasAdminRole = userRoles.some(r => {
        if (r === "admin") return true;
        if (typeof r === "string" && r.includes(",")) {
            return r.split(",").map(s => s.trim()).includes("admin");
        }
        return false;
    });

    const isAdmin = hasAdminRole || (req.user.role === "admin");

    if (house.user.toString() !== userId.toString() && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to delete this house",
        debug: {
            userRoles: req.user.roles,
            userRole: req.user.role,
            userId: req.user._id,
            houseOwner: house.user
        }
      });
    }

    await House.findByIdAndDelete(id);
    await redis.flushall(); // Optional: clears cache

    res.status(200).json({ message: "House deleted successfully", id });
  } catch (err) {
    console.error("❌ Error deleting house:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getHouses=async(req,res)=>{
  console.log("this is the querry",req.query)

  try{
    const {search="",cursor,limit =20,filter, _start, _end}=req.query;
    const cacheKey=`houses:${search || "all"}:${filter || "none"}:${cursor || "start"}:${limit}:${_start}:${_end}`;

    // try cache first
    const cachedData = await redis.get(cacheKey);

    if(cachedData){
      console.log("💾 Cache hit");
      return res.json(JSON.parse(cachedData));
    }

    let houses=[];

    //  full-text search if search query exists

    if(search){
      const matchedBusinesses=await BusinessProfile.find(
        {$text:{$search:search}},
        {user:1}
      );
      const matchedUsers=await User.find(
        {$text:{$search:search}},
        {_id:1}
      )

      const relatedUserIds=[
        ...new Set(
          [
            ...matchedBusinesses.map(b=> b.user),
            ...matchedUsers.map(u=>u._id)
          ]
        )
      ]

      let byUsers=[];
      if(relatedUserIds.length>0){
        byUsers=await House.find({user:{$in:relatedUserIds}}).lean()
      }

      let byText=await House.find({$text:{$search:search}}, {score:{$meta:"textScore"}})
      .sort({score:{$meta:"textScore"}})
      .lean()

      //  Merge results, remove duplicates
      const map = new Map();
      [...byUsers, ...byText].forEach(h=> map.set(h._id.toString(),h));
      houses= Array.from(map.values());
    }else{
      //  no search -> fecth normally with filters

      const mongoFilter={};
      if (cursor) mongoFilter._id = {$lt: cursor};
      if (filter==="shortLet") mongoFilter.durationType= "short";
      if(filter==="fullLet") mongoFilter.durationType="long";
      if(filter==="available") mongoFilter.isAvailable = true;
      if(filter==="taken") mongoFilter.isAvailable = false;

      houses= await House.find(mongoFilter)
      .sort({createdAt:-1})
      .skip(Number(_start) || 0)
      .limit(Number(limit))
      .lean();
    }
      //  Apply additional filter (cursor + duration ) in Js if needed

      if(cursor) houses=houses.filter(h=>h._id < cursor);
      if(filter==="shortLet") houses=houses.filter(h =>h.durationType === "short");
      if(filter==="fullLet") houses = houses.filter(h => h.durationType==="long")

        //  fuse.js fuzzy fallback if text search returned <5 results

        if(houses.length <5 && search){
          console.log("🧠 Triggering fuzzy search fallback")

          const allHouses =await House.find({}).populate("user","firstname lastname email address phone")
          .lean()
          const fuse = new Fuse(allHouses, {
            keys: [
              "house Type",
              "description",
              "location.state",
              "location.lga",
              "location.town",
              "user.firstname",
              "user.lastname",
              "user.email",
              "user.address",
              "companyName",
              "user.businessProfile.company"
            ],
            threshold: 0.4
          });
          houses = fuse.search(search).slice(0, limit).map(r => r.item);
    }

    //  Populate user for all houses

    houses = await User.populate(houses,{path:"user", select: "firstname lastname email address phone"})

    const nextCursor = houses.length ? houses[houses.length - 1]._id :null
    const hasMore= houses.length ===Number(limit);

    // Get total count for pagination
    const total = await House.countDocuments({});

    const result = {houses, hasMore, nextCursor, total};

    //  Cache results for 5 minutes

    await redis.set(cacheKey, JSON.stringify(result, "EX", 300));
    return res.json(result)
  }catch(err){

    console.error("❌ Error fetching houses:", err);
    res.status(500).json({message:"Server Error", error: err.message});
  }
}



exports.getHouseById = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const cacheKey = `house:${id}`;

    // 1️⃣ Check Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("💾 Cache hit (single house)");
      return res.json(JSON.parse(cached));
    }

    // 2️⃣ Query MongoDB
    console.log("🧠 Cache miss (single house)");
    const house = await House.findById(id).populate("user", "name email");

    if (!house) return res.status(404).json({ message: "House not found" });

    // 3️⃣ Cache result for 10 minutes
    await redis.set(cacheKey, JSON.stringify(house), "EX", 600);

    res.json(house);
  } catch (err) {
    console.error("❌ Error fetching house:", err);
    res.status(500).json({ message: "Server Error", error: err.message, stack: err.stack });
  }
};

exports.getMyHouses=async (req, res) => {
  console.log("the requested house ",req)
  try {
    const userId = req.user._id;
    const houses = await House.find({ user: userId });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message, stack: err.stack });
  }
}


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
    res.status(500).json({ msg: "Server error" ,error:err.message, stack:err.stack});
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
res.status(500).json({message:"server error",error:err.message, stack:err.stack})
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
    res.status(500).json({ msg: "Server error" , error:err.message, stack:err.stack});
  }
};



exports.getHouseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id)
      .populate("user", "username email phone whatsapp")
      .populate("comments.user", "username email");

    if (!house) return res.status(404).json({ msg: "House not found" });

    // Debug log for video
    console.log(`[DEBUG] House ${id} videoUrl:`, house.videoUrl);

    res.status(200).json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" ,error:err.message, stack:err.stack});
  }
};
