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
    type: DataTypes.STRING,
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  estoqueAtual: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  estoqueMinimo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  hooks: {
    beforeSave: async (item) => {
      if (item.changed('estoqueAtual') || item.isNewRecord) {
        item.disponivel = item.estoqueAtual > 0;
        
        if (item.estoqueAtual < item.estoqueMinimo) {
          console.warn(`Atenção: Estoque do item ${item.titulo} abaixo do mínimo!`);
        }
        
        if (item.estoqueAtual === 0 && item.changed('estoqueAtual') && item._previousDataValues.estoqueAtual > 0) {
          console.warn(`Atenção: Estoque do item ${item.titulo} zerou!`);
        }
      }
    },
    
    afterUpdate: async (item) => {
      if (item.disponivel && item._previousDataValues.disponivel === false) {
        console.log(`Item ${item.titulo} está disponível novamente!`);
      }
    }
  }
});

Item.prototype.decrementarEstoque = async function(quantidade) {
  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser positiva');
  }
  
  if (this.estoqueAtual < quantidade) {
    throw new Error('Estoque insuficiente');
  }
  
  this.estoqueAtual -= quantidade;
  
  return this.save();
};

Item.prototype.incrementarEstoque = async function(quantidade) {
  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser positiva');
  }
  
  this.estoqueAtual += quantidade;
  
  return this.save();
};

Item.prototype.verificarDisponibilidade = function() {
  return this.estoqueAtual > 0 && this.disponivel;
};

module.exports = Item;