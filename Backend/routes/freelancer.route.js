const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllWorks, acceptWork, worksOnSkills, getFreelancerProfile } = require('../controllers/freelancer.controller');

router.get('/works', authMiddleware, getAllWorks);
router.post('/:id/accept', authMiddleware, acceptWork);
router.get('/skills', authMiddleware, worksOnSkills);
router.get('/profile', authMiddleware, getFreelancerProfile);

module.exports = router;