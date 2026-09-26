const { DataTypes } = require('sequelize');
const db = require('../db/conn'); // Conexão do Sequelize com MySQL

const Patient = db.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kidneyStage: {
        type: DataTypes.STRING, // Ex: "Estágio 3", "Estágio 5 - Diálise"
        allowNull: true,
    }
});

module.exports = Patient;