const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), itemController.create);
router.get('/', authMiddleware, roleMiddleware(['admin']), itemController.getAll);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), itemController.getOne);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), itemController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), itemController.delete);

module.exports = router;