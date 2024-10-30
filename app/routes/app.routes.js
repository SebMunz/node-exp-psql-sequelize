// app/routes/app.routes.js
// Estructuré las rutas en un controlador separado
"use strict"
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const bootcampController = require('../controllers/bootcamp.controller');

//Rutas de Usuarios
router.post('/users', userController.createUser);
router.get('/users', userController.findAll);
router.get('/users/:id', userController.findUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

//Rutas de Bootcamps
router.post('/bootcamps', bootcampController.createBootcamp);
router.get('/bootcamps', bootcampController.findAll);
router.get('/bootcamps/:id', bootcampController.findById);

module.exports = router;