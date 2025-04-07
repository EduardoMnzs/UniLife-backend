const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const sequelize = require('./config/database');
const Item = require('./models/item');

const app = express();
app.use(bodyParser.json());
app.use('/api/itens', itemRoutes);

sequelize.sync();

module.exports = app;