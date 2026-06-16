const publicacion = require('./src/models/publicacion.model');

const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'API de Agentes',
        description: 'Documentación de la API para la gestión de agentes.'
    },
    host: 'localhost:3000', // Reemplaza con la dirección de tu servidor
    basePath: "/",
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Socio',
            description: 'Operaciones relacionadas con los socios.'
        },
        {
            name: 'Transaccion',
            description: 'Operaciones relacionadas con las transacciones.'
        },
        {
            name: 'Empleado',
            description: 'Operaciones relacionadas con los empleados.'
        },
        {
            name: 'Publicacion',
            description: 'Operaciones relacionadas con las publicaciones.'
        }
    ],
    definitions: {
        Socio: {
            nro_socio: 12345,
            dni: '12345678',
            apellido: 'Perez',
            nombre: 'Juan',
            foto: 'foto.jpg',
            activo: true
        },
        Transaccion: {
            idiomaOrigen: 'español',
            TextoOrigen: 12345,
            idiomaDestino: 'ingles',
            TextoDestino: 12345,
            emailCliente: '[EMAIL_ADDRESS]'
        },
        Empleado: {
            dni: '12345678',
            apellido: 'Perez',
            nombre: 'Juan',
            email: '[EMAIL_ADDRESS]'
        },
        publicacion: {
            Titulo: 'Juan',
            Contenido: 'Pérez',
            ImagenAsociada: 'foto.jpg',
            fechaPublicacion: '2022-01-01',
            vigente: true,
            empleado: {
                dni: '12345678',
                apellido: 'Perez',
                nombre: 'Juan',
                email: '[EMAIL_ADDRESS]'
            }
        }
    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // verifica la ruta
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada en ${outputFile}`);
    //require('./index.js'); // verifica la ruta donde inicia tu app
});