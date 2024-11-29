const express = require('express');
const router = express.Router();

const {readMyWork, readMyCounterWorks, chatBot} = require('../controllers/companyController')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.get('/works', authMiddleware, readMyWork);
router.get('/:id/counterworks', authMiddleware, readMyCounterWorks);
router.post('/chatbot', authMiddleware, chatBot)
module.exports = router