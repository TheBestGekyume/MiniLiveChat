const express = require('express');
const router = express.Router();


// Importar as funções de controller
const createUser = require('../controllers/users/createUser');
const getAllUsers = require('../controllers/users/getAllUsers');
const getUserById = require('../controllers/users/getUserById');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

// Rotas
router.post('/user/', createUser); 
router.get('/user/', getAllUsers); 
router.get('/user/:id', getUserById); 
router.put('/user/:id', updateUser); 
router.delete('/user/:id', deleteUser);

module.exports = router;
