const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Paciente = db.define('Paciente', {
    nome: {
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
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estagioRenal: {
        type: DataTypes.STRING,
        defaultValue: 'Em Avaliação',
    }
});

module.exports = Paciente;