const { Sequelize } = require('sequelize');
// Crea proyectodb en el servidory configura las credenciales de tu bd de PostgreSQL
const sequelize = new Sequelize('proyectodb', 'postgres', 'meteorito2125', {//el primer parametro es la en name de BD el segundo es el usuario y el trecero es la constraseña y lo de abajo es la configuracion de la conexion
host: 'localhost',
dialect: 'postgres',//aca te dice con que BD te conectar al ser postgres es la misma para todas
logging: false, // Evita que llene la consola con logs de consultas SQL básicas
});
// Probar y levantar la conexión
sequelize.authenticate()
.then(() => console.log('DB is connected to PostgreSQL que onda mi gente estoy on fire'))//then sirve para mostrar si la conexion fue exitosa y catch para mostrar si hubo un error. Osea que capturan el estado de la conexion.
.catch(err => console.error('Error al conectar a PostgreSQL:', err));
module.exports = sequelize;