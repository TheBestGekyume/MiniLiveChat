const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(userRoutes);
app.use(messageRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
