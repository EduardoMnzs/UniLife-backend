const sequelize = require('../config/database');
const { User, PointTransaction } = require('../models');

async function concederPontos(userId, valor, descricao, transacaoExistente = null) {

    const t = transacaoExistente || (await sequelize.transaction());

    try {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        await PointTransaction.create({ userId, valor, descricao }, { transaction: t });
        await user.increment('pontos', { by: valor, transaction: t });

        if (!transacaoExistente) {
            await t.commit();
        }

    } catch (error) {
        if (!transacaoExistente) {
            await t.rollback();
        }
        throw error;
    }
}

module.exports = {
    concederPontos
};