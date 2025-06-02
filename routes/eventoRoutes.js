const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/:id/checkin', authMiddleware, eventoController.checkIn);
router.post('/', authMiddleware, roleMiddleware(['admin']), eventoController.criarEvento);

router.get('/', authMiddleware, eventoController.getEventos);
router.get('/:id', authMiddleware, eventoController.getEventoId);

router.put('/:id', authMiddleware, roleMiddleware(['admin']), eventoController.atualizarEvento);

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), eventoController.deletarEvento);

module.exports = router;