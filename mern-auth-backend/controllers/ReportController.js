const Report = require('../models/Report');
const User = require('../models/User');
const House = require('../models/House');

exports.createReport = async (req, res) => {
  try {
    const { targetType, targetId, reason, description } = req.body;
    const reporter = req.user._id;

    // Validate target exists
    if (targetType === 'House') {
      const house = await House.findById(targetId);
      if (!house) return res.status(404).json({ message: 'House not found' });
    } else if (targetType === 'User') {
      const user = await User.findById(targetId);
      if (!user) return res.status(404).json({ message: 'User not found' });
    }

    const report = new Report({
      reporter,
      targetType,
      targetId,
      reason,
      description
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    console.error('❌ Error creating report:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'firstname lastname email')
      .populate('targetId') // This might need refinement depending on what fields we want from House/User
      .sort({ createdAt: -1 });

    // We might need to manually populate targetId based on targetType if mongoose doesn't handle mixed refs perfectly with just .populate('targetId')
    // But refPath usually handles it. Let's assume it works for now.

    res.json(reports);
  } catch (err) {
    console.error('❌ Error fetching reports:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate('reporter', 'firstname lastname email')
      .populate('targetId');

    if (!report) return res.status(404).json({ message: 'Report not found' });

    res.json(report);
  } catch (err) {
    console.error('❌ Error fetching report:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!report) return res.status(404).json({ message: 'Report not found' });

    res.json({ message: 'Report status updated', report });
  } catch (err) {
    console.error('❌ Error updating report:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Report.findByIdAndDelete(id);
        res.json({ message: 'Report deleted' });
    } catch (err) {
        console.error('❌ Error deleting report:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
