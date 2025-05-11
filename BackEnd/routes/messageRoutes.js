const express = require('express');
const router = express.Router();

// Importar as funções de controller
const createMessage = require('../controllers/messages/createMessage');
const getAllMessages = require('../controllers/messages/getAllMessages');
const updateMessage = require('../controllers/messages/updateMessage');
const deleteMessage = require('../controllers/messages/deleteMessage');

// Rotas
router.get('/message', getAllMessages);
router.post('/message', createMessage);
router.put('/message/:id', updateMessage);
router.delete('/message/:id', deleteMessage);

module.exports = router;
