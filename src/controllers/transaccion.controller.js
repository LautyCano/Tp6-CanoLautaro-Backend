const Transaccion = require('../models/transaccion.model');
const transaccionCtrl = {};

//Get: Obtener todas las transacciones
transaccionCtrl.getTransacciones = async (req, res) => {
     /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener todas las transacciones'
    #swagger.description = 'Retorna una lista de todas las transacciones.'
    #swagger.responses[200] = {
        description: 'Lista de transacciones obtenida con éxito.',
        schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        const transacciones = await Transaccion.findAll();
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
};

//Post: Crear una nueva transaccion
transaccionCtrl.createTransacciones = async (req, res) => {
    /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Crear una nueva transaccion'
    #swagger.description = 'Agrega una nueva transaccion.'
    #swagger.responses[200] = {
        description: 'Transaccion agregada con éxito.',
        schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        await Transaccion.create(req.body);
        res.json({ status: '1', msg: 'Transaccion guardada.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
};

//Get: Recuperar  historico de transacciones por email
transaccionCtrl.getTransaccionbyEmail = async (req, res) => {
     /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener una transaccion por email'
    #swagger.description = 'Retorna una transaccion por email.'
    #swagger.responses[200] = {
        description: 'Transaccion obtenida con éxito.',
        schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        const criteria = {}; 
        if (req.query.emailCliente ) {
            criteria.where = {emailCliente:req.query.emailCliente};
        }
        const transacciones = await Transaccion.findAll(criteria);
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
};

//Get: Recuperar Todas las transacciones por destino y origen
transaccionCtrl.getTransaccionbyIdioma = async (req, res) => {
     /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener una transaccion por idioma origen y destino'
    #swagger.description = 'Retorna una transaccion por idioma origen y destino.'
    #swagger.responses[200] = {
        description: 'Transaccion obtenida con éxito.',
        schema: { $ref: '#/definitions/Transaccion' }
    }
    */
   try {
        const criteria = {}; 
        if (req.params.idiomaOrigen && req.params.idiomaDestino) {
            criteria.where = { idiomaOrigen: req.params.idiomaOrigen, idiomaDestino: req.params.idiomaDestino };
        }
        const transacciones = await Transaccion.findAll(criteria);
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
};

module.exports = transaccionCtrl;