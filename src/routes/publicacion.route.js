//defino controlador para el manejo de CRUD
const publicacionCtrl = require('../controllers/publicacion.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', publicacionCtrl.getPublicaciones);
router.post('/', publicacionCtrl.createPublicacion);
router.get('/:Titulo/:vigente', publicacionCtrl.getPublicacionbyTitulo);
router.put('/:id', publicacionCtrl.editPublicacion);
router.delete('/:id', publicacionCtrl.deletePublicacion);
//exportamos el modulo de rutas
module.exports = router;
