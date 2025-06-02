const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id/resgatar', authMiddleware, produtoController.resgatar);

module.exports = router;