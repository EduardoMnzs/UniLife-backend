// services/pontos.service.js

const { sequelize, User, PointTransaction } = require('../models');

async function concederPontos(userId, valor, descricao, transacaoExistente = null) {

  const t = transacaoExistente || (await sequelize.transaction());

  try {
    const user = await User.findByPk(userId, { transaction: t });

    if (!user) {
      throw new Error('Usuário não encontrado ao tentar conceder pontos.');
    }

    await PointTransaction.create({ userId, valor, descricao }, { transaction: t });
    await user.increment('pontos', { by: valor, transaction: t });
    
    console.log(`[PONTOS SERVICE] Operações no banco (create e increment) foram executadas para o usuário ${user.id}.`);

    if (!transacaoExistente) {
      console.log('[PONTOS SERVICE] Esta é uma transação nova. EXECUTANDO COMMIT...');
      await t.commit();
      console.log('[PONTOS SERVICE] COMMIT REALIZADO COM SUCESSO.');
    } else {
      console.log('[PONTOS SERVICE] Usando transação externa. O commit será feito pelo serviço principal (ex: resgate de produto).');
    }
    
  } catch (error) {
    console.error('[PONTOS SERVICE] Ocorreu um erro dentro do try...catch:', error);
    if (!transacaoExistente && t) {
      console.log('[PONTOS SERVICE] ERRO: Executando rollback...');
      await t.rollback();
    }
    throw error;
  }
}

module.exports = { concederPontos };