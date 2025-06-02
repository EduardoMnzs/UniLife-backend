module.exports = (sequelize, DataTypes) => {
    const Resgate = sequelize.define('Resgate', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pontos_gastos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: false,
        createdAt: 'data_resgate'
    });

    return Resgate;
};