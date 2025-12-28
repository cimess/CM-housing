const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ReportController = require('../controllers/ReportController');

// Submit a report (Authenticated users)
router.post('/', authenticate, ReportController.createReport);

// Admin routes (Should be protected by admin middleware in real app, using authenticate for now)
router.get('/', authenticate, ReportController.getAllReports);
router.get('/:id', authenticate, ReportController.getReportById);
router.put('/:id/status', authenticate, ReportController.updateReportStatus);
router.delete('/:id', authenticate, ReportController.deleteReport);

module.exports = router;
