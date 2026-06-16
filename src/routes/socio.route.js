//defino controlador para el manejo de CRUD
const socioCtrl = require('../controllers/socio.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', socioCtrl.getSocios);
router.post('/', socioCtrl.createSocio);
router.get('/activo', socioCtrl.getSociobyEstado);
router.put('/:id', socioCtrl.editSocio);
router.delete('/:id', socioCtrl.deleteSocio);
//exportamos el modulo de rutas
module.exports = router;