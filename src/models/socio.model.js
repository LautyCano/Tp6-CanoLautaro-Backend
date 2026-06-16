const { DataTypes } = require('sequelize');//importamos sequelize
const sequelize = require('../../config/database'); //importamos la conexion a la base de datos
const Socio = sequelize.define('Socio', {//aca definimos el modelo de la tabla "clase"
// Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    nro_socio: {type: DataTypes.INTEGER, allowNull: false},//nombre type= tipo allowNull = permite nulos
    dni: {type: DataTypes.STRING, allowNull: false },
    apellido: {type: DataTypes.STRING, allowNull: false},
    nombre: {type: DataTypes.STRING, allowNull: false},
    foto: {type: DataTypes.STRING, allowNull: false},
    activo: {type: DataTypes.BOOLEAN, allowNull: false}
}, {
tableName: 'socios', // Nombre de la tabla en minúsculas y plural
timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});
module.exports = Socio;//exporta la clase