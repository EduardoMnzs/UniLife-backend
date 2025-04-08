require('dotenv').config();
const express = require('express');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(express.json());
app.use('/api', uploadRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});