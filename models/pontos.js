const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PointTransaction = sequelize.define('PointTransaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referenciaId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipoReferencia: {
        type: DataTypes.ENUM('evento', 'produto'),
        allowNull: true
    }
}, {
    timestamps: true,
    updatedAt: false
});

module.exports = PointTransaction;