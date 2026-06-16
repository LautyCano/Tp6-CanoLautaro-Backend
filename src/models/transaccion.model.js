const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Transaccion = sequelize.define('Transaccion', { 
    idiomaOrigen: {type: DataTypes.STRING, allowNull: false},
    TextoOrigen: {type: DataTypes.INTEGER, allowNull: false },
    idiomaDestino: {type: DataTypes.STRING, allowNull: false},
    TextoDestino: {type: DataTypes.INTEGER, allowNull: false},
    emailCliente: {type: DataTypes.STRING, allowNull: false}
}, {
tableName: 'transacciones', 
timestamps: true, 
});

module.exports = Transaccion;