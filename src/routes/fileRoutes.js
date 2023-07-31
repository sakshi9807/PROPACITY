const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/files/upload', authMiddleware.authenticateUser, upload.single('file'), fileController.uploadFile);

module.exports = router;
