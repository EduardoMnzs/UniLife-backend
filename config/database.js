const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lia', 'admin', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

sequelize.authenticate()
  .then(() => console.log('Conectado com sucesso ao PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));