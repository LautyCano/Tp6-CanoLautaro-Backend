const Empleado = require('../models/empleado.model');
const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {

    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Obtener todos los empleados'
    #swagger.description = 'Retorna una lista de todos los empleados.'
    #swagger.responses[200] = {
        description: 'Lista de empleados obtenida con éxito.',
        schema: { $ref: '#/definitions/Empleado' }
    }
    */

    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los empleados.' }); 
    }
};

// Crear un nuevo empleado "DAR DE ALTA"
empleadoCtrl.createEmpleado = async (req, res) => {
    
    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Crear un nuevo empleado'
    #swagger.description = 'Agrega un nuevo empleado.'
    #swagger.responses[200] = {
        description: 'Empleado agregado con éxito.',
        schema: { $ref: '#/definitions/Empleado' }
    }
    */
    try {
        await Empleado.create(req.body);
        res.json({ status: '1', msg: 'Empleado guardado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
};

// Obtener un empleado por DNI
empleadoCtrl.getEmpledobyDNI = async (req, res) => {
    
    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Obtener un empleado por DNI'
    #swagger.description = 'Retorna un empleado por DNI.'
    #swagger.responses[200] = {
        description: 'Empleado obtenido con éxito.',
        schema: { $ref: '#/definitions/Empleado' }
    }
    */
    try {
        const criteria = {}; 
        if (req.params.dni) { 
            criteria.where = {dni: req.params.dni};
        }
        const empleado = await Empleado.findAll(criteria);
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el empleado.' });
    }
};

module.exports = empleadoCtrl;