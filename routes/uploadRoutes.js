const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadS3Controller.js');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), authMiddleware, roleMiddleware(['admin']), uploadImage);

module.exports = router;