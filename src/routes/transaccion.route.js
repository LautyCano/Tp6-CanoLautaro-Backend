const transaccionCtrl = require('../controllers/transaccion.controller');

const express = require('express');
const router = express.Router();

router.get('/', transaccionCtrl.getTransacciones);
router.post('/', transaccionCtrl.createTransacciones);
router.get('/emailCliente', transaccionCtrl.getTransaccionbyEmail);
router.get('/buscar/:idiomaOrigen/:idiomaDestino', transaccionCtrl.getTransaccionbyIdioma);

module.exports = router;