const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Item;