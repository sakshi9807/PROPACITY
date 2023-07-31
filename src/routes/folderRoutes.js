const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/folders', authMiddleware.authenticateUser, folderController.createFolder);

module.exports = router;
