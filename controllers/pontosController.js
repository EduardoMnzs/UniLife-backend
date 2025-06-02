const pontosService = require('../services/pontos');

async function grantPoints(req, res) {
  try {
    const { userId, valor, descricao } = req.body;

    console.log(`[Controller] Iniciando a concessão de ${valor} pontos para o usuário de ID: ${userId}`);

    const novaTransacaoDePonto = await pontosService.concederPontos(userId, valor, descricao);

    console.log('[Controller] Serviço finalizado. Enviando resposta de sucesso.');

    return res.status(201).json({
      message: "Pontos concedidos com sucesso!",
      transaction: novaTransacaoDePonto
    });

  } catch (error) {
    console.error("[Controller] Erro ao tentar conceder pontos:", error);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor.' });
  }
}

module.exports = {
  grantPoints
};