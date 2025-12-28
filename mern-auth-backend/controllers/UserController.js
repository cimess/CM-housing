const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, isBanned, isRestricted, _start, _end, _sort, _order } = req.query;
    const query = {};

    // Search filter (Name or Email)
    if (search) {
      query.$or = [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Role filter
    if (role) {
      query.roles = role;
    }

    // Status filters
    if (isBanned !== undefined) query.isBanned = isBanned === 'true';
    if (isRestricted !== undefined) query.isRestricted = isRestricted === 'true';

    // Pagination & Sorting (compatible with Refine)
    const start = parseInt(_start) || 0;
    const end = parseInt(_end) || 10;
    const limit = end - start;
    const sortField = _sort || 'createdAt';
    const sortOrder = _order === 'DESC' ? -1 : 1;

    const total = await User.countDocuments(query);
    const users = await User.find(query, "-password")
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(limit);

    // Set X-Total-Count header for Refine (if needed, but we return object usually)
    res.header('X-Total-Count', total);

    res.json({
        data: users,
        total: total
    });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    // Optionally delete related data like houses, reports, etc.
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Expect { isBanned: true/false, isRestricted: true/false }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User status updated", user });
  } catch (err) {
    console.error("❌ Error updating user status:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
