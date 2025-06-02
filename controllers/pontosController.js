const PointService = require('../services/pontos');

async function grantPoints(req, res) {
  const { userId, valor, descricao } = req.body;

  if (!userId || !valor || !descricao) {
    return res.status(400).json({ message: 'Campos userId, valor e descricao são obrigatórios.' });
  }

  try {
    const newTransaction = await PointService.concederPontos(userId, valor, descricao);

    return res.status(201).json({ 
        message: 'Pontos concedidos com sucesso!',
        transaction: newTransaction
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  grantPoints
};