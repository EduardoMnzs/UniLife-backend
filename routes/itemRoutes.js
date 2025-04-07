const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.create);
router.get('/', itemController.getAll);
router.get('/:id', itemController.getOne);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;