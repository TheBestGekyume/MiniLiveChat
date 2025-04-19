const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());

app.use(userRoutes);
app.use(messageRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
