const express = require('express');
const router = express.Router();

// Importar as funções de controller
const createUser = require('../controllers/users/createUser');
const getAllUsers = require('../controllers/users/getAllUsers');
const getUserById = require('../controllers/users/getUserById');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

// Rotas
router.post('/', createUser);  // Rota POST para criar um usuário
router.get('/', getAllUsers);  // Rota GET para listar todos os usuários
router.get('/:id', getUserById);  // Rota GET para buscar um usuário pelo ID
router.put('/:id', updateUser);  // Rota PUT para atualizar um usuário
router.delete('/:id', deleteUser);  // Rota DELETE para deletar um usuário

module.exports = router;
