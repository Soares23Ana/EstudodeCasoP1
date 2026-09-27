const express = require('express');
const router = express.Router();
const ConsultaController = require('../controllers/consultaController');
const verificarToken = require('../helpers/verificarToken');

// Ambas as rotas exigem o Token JWT (Usuário logado)
router.post('/agendar', verificarToken, ConsultaController.agendar);
router.get('/minhas-consultas', verificarToken, ConsultaController.minhasConsultas);

module.exports = router;