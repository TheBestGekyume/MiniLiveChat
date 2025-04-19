const express = require('express');
const router = express.Router();

// Importar as funções de controller
const createUser = require('../controllers/users/createUser');
const getAllUsers = require('../controllers/users/getAllUsers');
const getUserById = require('../controllers/users/getUserById');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

// Rotas
router.post('/user/', createUser);  // Rota POST para criar um usuário
router.get('/user/', getAllUsers);  // Rota GET para listar todos os usuários
router.get('/user/:id', getUserById);  // Rota GET para buscar um usuário pelo ID
router.put('/user/:id', updateUser);  // Rota PUT para atualizar um usuário
router.delete('/user/:id', deleteUser);  // Rota DELETE para deletar um usuário

module.exports = router;
