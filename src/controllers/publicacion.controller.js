const Publicacion = require('../models/publicacion.model');
const Empleado = require('../models/empleado.model');
const { Op } = require('sequelize');// se importa esto para poder usar op.substring que sirve para buscar dentro de un string

const publicacionCtrl = {};

// Obtener todas las publicaciones con info de los emprelados
publicacionCtrl.getPublicaciones = async (req, res) => {
     /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Obtener todas las publicaciones'
    #swagger.description = 'Retorna una lista de todas las publicaciones.'
    #swagger.responses[200] = {
        description: 'Lista de publicaciones obtenida con éxito.',
        schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const publicaciones = await Publicacion.findAll({
            attributes:{
                exclude: [ 'createdAt', 'updatedAt' ] //no muestra estos atributos de la publicacion
            },
            include: [{ //muestra los demas atributos del empleado
                model: Empleado,
                as: 'empleado',

                    attributes:{
                        exclude: [ 'id', 'createdAt', 'updatedAt'] //no muestra estos atributos del empleado
                    },
                }]
        });
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las publicaciones.' });
    }
};

// Crear un nuevo socio "DAR DE ALTA"
publicacionCtrl.createPublicacion = async (req, res) => {
     /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Crear una nueva publicacion'
    #swagger.description = 'Agrega una nueva publicacion.'
    #swagger.responses[200] = {
        description: 'Publicacion agregada con éxito.',
        schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const data = req.body

        if (data.empleado && data.empleado.id){
            data.empleadoId = data.empleado.id
        }
        await Publicacion.create(data);
        res.json({ status: '1', msg: 'Publicacion guardada.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
};

// Obtener publicacion por busqueda combinada de titulo(parcial) y vigencia
publicacionCtrl.getPublicacionbyTitulo = async (req, res) => {
     /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Obtener una publicacion por titulo y vigencia'
    #swagger.description = 'Retorna una publicacion por titulo y vigencia.'
    #swagger.responses[200] = {
        description: 'Publicacion obtenida con éxito.',
        schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        // 1. Armamos las condiciones del WHERE dinámicamente
        const condiciones = {};
        
        if (req.params.Titulo) {
            condiciones.Titulo = { [Op.substring]: req.params.Titulo };
        }
        
        if (req.params.vigente !== undefined) {
            condiciones.vigente = req.params.vigente === "true";
        }

        const publicacion = await Publicacion.findAll({
            where: condiciones, 
            attributes: {
                exclude: ['createdAt', 'updatedAt'] 
            },
            include: [{ 
                model: Empleado,
                as: 'empleado',
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                }
            }]
        });
        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las publicaciones filtradas.' });
    }
};

// Modificar Publicacion pod ID PARAMS
publicacionCtrl.editPublicacion = async (req, res) => {
     /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Modificar una publicacion'
    #swagger.description = 'Modifica una publicacion por ID.'
    #swagger.responses[200] = {
        description: 'Publicacion modificada con éxito.',
        schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        await Publicacion.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Publicacion modificada' });
    } catch (error) {   
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

// Eliminar una publicacion por ID forma fisica
publicacionCtrl.deletePublicacion = async (req, res) => {
     /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Eliminar una publicacion'
    #swagger.description = 'Elimina una publicacion por ID.'
    #swagger.responses[200] = {
        description: 'Publicacion eliminada con éxito.',
        schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        await Publicacion.destroy({
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Publicacion eliminada' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

module.exports = publicacionCtrl;