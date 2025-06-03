const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;

sequelize.authenticate()
  .then(() => console.log('Conectado com sucesso ao PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));