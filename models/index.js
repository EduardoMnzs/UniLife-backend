const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.sequelize = sequelize;

db.CheckIn = require('./checkin')(sequelize, Sequelize);
db.Evento = require('./evento')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);
db.PointTransaction = require('./pontos')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Resgate = require('./resgate')(sequelize, Sequelize);

// Associação User <-> CheckIn
db.User.hasMany(db.CheckIn, { foreignKey: 'userId' });
db.CheckIn.belongsTo(db.User, { foreignKey: 'userId' });

// Associação Evento <-> CheckIn
db.Evento.hasMany(db.CheckIn, { foreignKey: 'eventoId' });
db.CheckIn.belongsTo(db.Evento, { foreignKey: 'eventoId' });

// Associação User <-> PointTransaction
db.User.hasMany(db.PointTransaction, { foreignKey: 'userId' });
db.PointTransaction.belongsTo(db.User, { foreignKey: 'userId' });

// Associação User <-> Resgate
db.User.hasMany(db.Resgate, { foreignKey: 'userId' });
db.Resgate.belongsTo(db.User, { foreignKey: 'userId' });

// Associação Item <-> Resgate
db.Item.hasMany(db.Resgate, { foreignKey: 'itemId' });
db.Resgate.belongsTo(db.Item, { foreignKey: 'itemId' });

console.log('Todos os modelos e associações foram carregados.');

module.exports = db;