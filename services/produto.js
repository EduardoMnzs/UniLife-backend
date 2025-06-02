const { sequelize, User, Item, PointTransaction, Resgate } = require('../models');

async function resgatarProduto(userId, itemId) {

  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t, lock: t.LOCK.UPDATE });
    const item = await Item.findByPk(itemId, { transaction: t, lock: t.LOCK.UPDATE });

    if (!item) {
      throw new Error('Produto não encontrado.');
    }

    if (!item.disponivel || item.estoqueAtual <= 0) {
        throw new Error('Este produto está esgotado.');
    }
    if (user.pontos < item.pontos) {
        throw new Error('Pontos insuficientes para resgatar este produto.');
    }

    await user.decrement('pontos', { by: item.pontos, transaction: t });
    await item.decrement('estoqueAtual', { by: 1, transaction: t });
    
    await PointTransaction.create({
      userId: userId,
      valor: -item.pontos,
      descricao: `Resgate do produto: ${item.titulo}`
    }, { transaction: t });

    await Resgate.create({
      userId: userId,
      itemId: itemId,
      pontos_gastos: item.pontos
    }, { transaction: t });

    await t.commit();

    console.log(`[SERVIÇO FINALIZADO] Sucesso para o item ID: ${itemId}`);
    return { message: `Produto "${item.titulo}" resgatado com sucesso!` };

  } catch (error) {
    if (t) await t.rollback();
    throw error;
  }
}

module.exports = { resgatarProduto };