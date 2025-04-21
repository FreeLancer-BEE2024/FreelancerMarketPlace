const express = require('express');
const router = express.Router();

const { readMyWork, readMyCounterWorks, companyProfile, acceptOrRejectCounterWorks } = require('../controllers/company.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/works', authMiddleware, readMyWork);
// Changed to use the authenticated user's company details
router.get('/counterworks', authMiddleware, readMyCounterWorks); // Removed :id parameter
router.get('/profile', authMiddleware, companyProfile);
router.post('/counter/:id/response', authMiddleware, acceptOrRejectCounterWorks);

module.exports = router;