const sequelize = require('../config/database');
const User = require('../models/user');
const PointTransaction = require('../models/pontos');

async function concederPontos(userId, valor, descricao) {

    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            await t.rollback();
            throw new Error('Usuário não encontrado');
        }

        const newTransaction = await PointTransaction.create({
            userId,
            valor,
            descricao
        }, { transaction: t });

        await user.increment('pontos', { by: valor, transaction: t });
        await t.commit();
        return newTransaction;

    } catch (error) {
        if (t) await t.rollback();
        console.error('Falha na transação de pontos:', error);
        throw error;
    }
}

module.exports = {
  concederPontos
};