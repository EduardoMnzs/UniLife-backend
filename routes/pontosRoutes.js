const express = require('express');
const router = express.Router();
const PointController = require('../controllers/pontosController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/grant', authMiddleware, roleMiddleware(['admin']), PointController.grantPoints);

module.exports = router;