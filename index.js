const express = require('express');//Esto es una importacion de Libreria
const cors = require('cors');
const sequelize = require('./config/database');//refrencia relativa
var app = express();

//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));//habilita el cort

//cargamos swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Asegúrate de que esta ruta sea correcta


//Cargamos el modulo de direccionamiento de rutas
app.use('/api/socios', require('./src/routes/socio.route.js')); //aca esta diciendo que la app use la ruta "/api/socios" para responder a "require = socio.routes.js"
app.use('/api/transacciones', require('./src/routes/transaccion.route.js'));
app.use('/api/empleados', require('./src/routes/empleado.route.js'));
app.use('/api/publicaciones', require('./src/routes/publicacion.route.js'));
// ruta hacia la documentacion de swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//setting
app.set('port', process.env.PORT || 3000);//escucha en el puerto 3000 si no hay puerto disponible
// Sincronizar Base de Datos y arrancar el servidor
// .sync() crea las tablas automáticamente en Postgres si aún no existen
// force en false crea las tablas solo si no existe, no borra datos en cada inicio
sequelize.sync({ force: true })//sincroniza la base de datos con las tablas definidas en los modelos
.then(() => {
    console.log('Tablas de PostgreSQL sincronizadas');
    app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
    });
})
.catch(err => {
    console.error('Error al sincronizar base de datos:', err);
});