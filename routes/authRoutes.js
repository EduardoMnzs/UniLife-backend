const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas protegidas
router.get('/me', authMiddleware, authController.getMe);
router.put('/change-password', authMiddleware, authController.changePassword);
router.delete('/delete-me', authMiddleware, authController.deleteMe);

// Rota de administrador
router.get('/admin/users', authMiddleware, roleMiddleware(['admin']), adminController.listUsers);
router.get('/admin/users/:id', authMiddleware, roleMiddleware(['admin']), adminController.getUserDetails);
router.put('/admin/users/:id', authMiddleware, roleMiddleware(['admin']), adminController.updateUser);
router.delete('/admin/users/:id', authMiddleware, roleMiddleware(['admin']), adminController.deleteUser);
router.get('/admin/dashboard', authMiddleware, roleMiddleware(['admin']), adminController.dashboard);

module.exports = router;