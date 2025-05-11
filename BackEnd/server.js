const express = require('express');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.56.1:5173'],
    credentials: true
}));

app.use(express.json());

app.use(userRoutes);
app.use(messageRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
