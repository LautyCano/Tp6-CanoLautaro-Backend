const Socio = require('../models/socio.model'); // Traemos los modelos
const socioCtrl = {};// objeto que va a contener todas las funciones

// Obtener todos los socios "RECUPERAR TODOS LOS SOCIOS"
socioCtrl.getSocios = async (req, res) => {//req es la peticion y res la respuesta, async = sirve para que la funcion sea asincronica (permite usar await = esperar a que termine la operacion)

     /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Obtener todos los socios'
    #swagger.description = 'Retorna una lista de todos los socios.'
    #swagger.responses[200] = {
        description: 'Lista de socios obtenida con éxito.',
        schema: { $ref: '#/definitions/Socio' }
    }
    */

    try {
        const socios = await Socio.findAll();// con el findAll busca dentro de la tabla de socios los datos que coincidan con lo que queremos. Al no poner nada dentro del findAll busca todos los datos
        res.json(socios);//con el json enviamos la respuesta en formato json
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los socios.' }); //con el status enviamos el estado de la respuesta y con el msg enviamos el mensaje de error
    }
};

// Crear un nuevo socio "DAR DE ALTA"
socioCtrl.createSocio = async (req, res) => {
    
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Crear un nuevo socio'
    #swagger.description = 'Agrega un nuevo socio.'
    #swagger.responses[200] = {
        description: 'Socio agregado con éxito.',
        schema: { $ref: '#/definitions/Socio' }
    }
    */
    
    try {
// Sequelize usa .create() para instanciar y guardar en un solo paso
        await Socio.create(req.body);
        res.json({ status: '1', msg: 'Socio guardado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
};

// Obtener socios por estado "RECUPERAR SOCIOS POR ESTADO"
socioCtrl.getSociobyEstado = async (req, res) => {

    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Obtener un socio por estado'
    #swagger.description = 'Retorna un socio por estado.'
    #swagger.responses[200] = {
        description: 'Socio obtenido con éxito.',
        schema: { $ref: '#/definitions/Socio' }
    }
    */

    try {
        // Buscamos por estados
        const criteria = {}; // criteria son los criterios de busqueda
        if (req.query.activo === "true" ) { //req.params son los parametros de la ruta y req.query son los parametros de la peticion
            criteria.where = {activo:true};//where es para filtrar los datos, lo que hace es buscar y traer solo los que coincidan con el criterio.
        }else if (req.query.activo === "false"){
            criteria.where = {activo:false};
        }
        const socio = await Socio.findAll(criteria);
        res.status(200).json(socio);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el agente.' });
    }
};

// Modificar Socio "MODIFICAR SOCIO"
socioCtrl.editSocio = async (req, res) => {

    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Modificar un socio'
    #swagger.description = 'Modifica un socio por ID.'
    #swagger.responses[200] = {
        description: 'Socio modificado con éxito.',
        schema: { $ref: '#/definitions/Socio' }
    }
    */

    try {
        await Socio.update(req.body, {
            where: { id: req.params.id }  //req.params.id es el id del socio que se quiere modificar, viene en los parametros de la peticion
        });
        res.json({ status: '1', msg: 'Socio updated' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

// Eliminar un Socio "ELIMINAR SOCIO" forma fisica
socioCtrl.deleteSocio = async (req, res) => {

    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Eliminar un socio'
    #swagger.description = 'Elimina un socio por ID.'
    #swagger.responses[200] = {
        description: 'Socio eliminado con éxito.',
        schema: { $ref: '#/definitions/Socio' }
    }
    */

    try {
// .destroy() elimina el registro que coincida con el ID enviado por parámetro
        await Socio.destroy({
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Socio removed' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

module.exports = socioCtrl;