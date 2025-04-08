const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/UploadController.js');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadImage);

module.exports = router;