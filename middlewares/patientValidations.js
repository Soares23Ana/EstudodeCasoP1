const { body, validationResult } = require('express-validator');

// Validação para cadastro de novos pacientes do IDR
const patientRegisterValidation = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('O nome completo do paciente é obrigatório.')
            .isLength({ min: 3 }).withMessage('O nome deve possuir ao menos 3 caracteres.'),
        body('cpf')
            .trim()
            .notEmpty().withMessage('O CPF é obrigatório.')
            .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter exatamente 11 dígitos numéricos.'),
        body('email')
            .trim()
            .isEmail().withMessage('Por favor, informe um e-mail válido para notificações do IDR.')
            .normalizeEmail(),
        body('phone')
            .trim()
            .notEmpty().withMessage('O telefone de contato/emergência é obrigatório.'),
        body('password')
            .isLength({ min: 6 }).withMessage('A senha do portal deve ter no mínimo 6 caracteres.'),
        body('confirmpassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('A confirmação de senha não confere com a senha digitada.');
                }
                return true;
            })
    ];
};

// Validação para acesso ao portal
const patientLoginValidation = () => {
    return [
        body('email').isEmail().withMessage('Informe um e-mail válido.'),
        body('password').notEmpty().withMessage('A senha é obrigatória.')
    ];
};

// Middleware interceptador de erros
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map(err => err.msg);

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    patientRegisterValidation,
    patientLoginValidation,
    validate,
};