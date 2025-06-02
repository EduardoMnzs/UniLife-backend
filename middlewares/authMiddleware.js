const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = async function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Autenticação falhou: Usuário do token não existe mais.' });
    }

    req.user = user;
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};