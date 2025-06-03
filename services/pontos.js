const { sequelize, User, PointTransaction } = require('../models');

async function concederPontos(userId, valor, descricao, transacaoExistente = null) {

  const t = transacaoExistente || (await sequelize.transaction());

  try {
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      throw new Error('Usuário não encontrado ao tentar conceder pontos.');
    }

    const novaTransacaoDePonto = await PointTransaction.create({ userId, valor, descricao }, { transaction: t });
    await user.increment('pontos', { by: valor, transaction: t });

    if (!transacaoExistente) {
      await t.commit();
    }

    return novaTransacaoDePonto;

  } catch (error) {
    console.error('[PONTOS SERVICE] Ocorreu um erro dentro do try...catch:', error);
    if (!transacaoExistente && t && t.finished !== 'commit' && t.finished !== 'rollback') {
      await t.rollback();
    }
    throw error;
  }
}

module.exports = { concederPontos };