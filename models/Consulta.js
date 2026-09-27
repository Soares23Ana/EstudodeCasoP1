const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Paciente = require('./Paciente');

const Consulta = db.define('Consulta', {
    data: {
        type: DataTypes.DATEONLY, // Guarda a data no formato YYYY-MM-DD
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    especialidade: {
        type: DataTypes.STRING,
        defaultValue: 'Nefrologia',
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Agendada', // Agendada, Concluída, Cancelada
    }
});

// Relacionamento (1 para N): Um Paciente tem Muitas Consultas
Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

module.exports = Consulta;