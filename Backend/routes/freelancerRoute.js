const express= require('express');
const router = express.Router();
const {getAllWorks, acceptWork, worksOnSkills} = require('../controllers/freelancerController')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.get("/works", authMiddleware, getAllWorks);
router.post("/:id/accept" , authMiddleware, acceptWork)
router.get('/skills', authMiddleware, worksOnSkills);


module.exports = router