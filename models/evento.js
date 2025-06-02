module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define('Evento', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT
        },
        pontos_oferecidos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false
        },
        data_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        data_fim: {
            type: DataTypes.DATE,
            allowNull: false
        },
        palavra_chave: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['palavra_chave']
            }
        },
        scopes: {
            comPalavraChave: {
                attributes: { include: ['palavra_chave'] }
            }
        }
    });

    return Evento;
};