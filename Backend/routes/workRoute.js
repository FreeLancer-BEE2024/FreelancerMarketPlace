const express = require('express');
const router = express.Router();

const {createWork, deleteWork} = require('../controllers/workController');
const {authMiddleware} = require("../middlewares/authMiddleware")


router.post('/', authMiddleware,createWork);
router.delete('/:id', authMiddleware, deleteWork);


module.exports = router
