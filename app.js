const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

const Item = require('./models/item');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/itens', itemRoutes);
app.use('/api', uploadRoutes);

app.use('/api/auth', authRoutes);

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao conectar/sincronizar com o banco de dados:', error);
    }
};

syncDatabase();

app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;