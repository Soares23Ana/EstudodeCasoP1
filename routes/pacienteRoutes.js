const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/pacienteController');
const verificarToken = require('../helpers/verificarToken');

// Rotas Públicas
router.post('/registrar', PacienteController.registrar);
router.post('/login', PacienteController.login);

// Rota Protegida (Exige o Token JWT no cabeçalho Authorization)
router.get('/perfil', verificarToken, PacienteController.obterPerfil);

module.exports = router;