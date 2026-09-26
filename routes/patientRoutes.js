const router = require('express').Router();
const PatientController = require('../controllers/patientController');

// Importação dos Middlewares
const verifyToken = require('../helpers/verify-token');
const { patientRegisterValidation, patientLoginValidation, validate } = require('../middlewares/patientValidations');

// Rotas Púbicas
router.post('/register', patientRegisterValidation(), validate, PatientController.register);
router.post('/login', patientLoginValidation(), validate, PatientController.login);

// Rota Protegida (Exige token Bearer JWT)
router.get('/profile', verifyToken, PatientController.getProfile);

module.exports = router;