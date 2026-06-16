const { DataTypes, HasMany } = require('sequelize');
const sequelize = require('../../config/database'); 
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
    Titulo: {type: DataTypes.STRING, allowNull: false},
    Contenido: {type: DataTypes.STRING, allowNull: false },
    ImagenAsociada: {type: DataTypes.TEXT, allowNull: false},// texto para poder guardar la imagen en forma de base64
    fechaPublicacion: {type: DataTypes.STRING, allowNull: false},
    vigente: {type: DataTypes.BOOLEAN, allowNull: false}
}, {
tableName: 'publicaciones',
timestamps: true,
});

Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId', as: 'publicaciones' });

Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId', as: 'empleado' });

module.exports = Publicacion;