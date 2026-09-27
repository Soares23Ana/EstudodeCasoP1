require('dotenv').config();
const express = require('express');
const app = express();
const conn = require('./db/conn');

// 1. Importação dos Models (Necessário importar ambos para o Sequelize criar os relacionamentos)
const Paciente = require('./models/Paciente');
const Consulta = require('./models/Consulta');

// 2. Importação das Rotas
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

// 3. Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Definição das rotas da API
app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);

// 5. Sincronização e Arranque do Servidor
conn.sync({ force: false}) 
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor a executar na porta 3000 🚀');
            console.log('Tabelas e relacionamentos sincronizados com sucesso!');
        });
    })
    .catch((err) => console.log('Erro ao sincronizar a base de dados:', err));