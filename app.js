const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const sequelize = require('./config/database');
const Item = require('./models/item');

const app = express();

app.use(bodyParser.json());
app.use('/api/itens', itemRoutes);
app.use('/api', uploadRoutes);

sequelize.sync();

module.exports = app;