const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class PatientController {

    // Cadastro de Paciente no IDR
    static async register(req, res) {
        const { name, cpf, email, phone, password, kidneyStage } = req.body;

        // Verifica duplicidade de registro
        const patientExists = await Patient.findOne({ where: { cpf } });
        if (patientExists) {
            return res.status(422).json({ message: 'Paciente já cadastrado com este CPF no IDR!' });
        }

        // Criptografia da senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            const newPatient = await Patient.create({
                name,
                cpf,
                email,
                phone,
                password: passwordHash,
                kidneyStage: kidneyStage || 'Em Avaliação'
            });

            // Geração de Token JWT
            const token = jwt.sign(
                { id: newPatient.id, name: newPatient.name },
                process.env.JWT_SECRET || 'idr_secret_key_2026',
                { expiresIn: '1d' }
            );

            res.status(201).json({
                message: 'Paciente cadastrado com sucesso no sistema IDR!',
                token,
                patientId: newPatient.id
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno no servidor: ' + error.message });
        }
    }

    // Login do Paciente no Portal IDR
    static async login(req, res) {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ where: { email } });
        if (!patient) {
            return res.status(422).json({ message: 'Paciente não encontrado no sistema do IDR!' });
        }

        const checkPassword = await bcrypt.compare(password, patient.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Credenciais inválidas!' });
        }

        const token = jwt.sign(
            { id: patient.id, name: patient.name },
            process.env.JWT_SECRET || 'idr_secret_key_2026',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Acesso liberado ao Portal do Paciente IDR!',
            token,
            patientId: patient.id
        });
    }

    // Rota Protegida: Consulta do Prontuário / Dados do Paciente
    static async getProfile(req, res) {
        try {
            const patient = await Patient.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });

            if (!patient) {
                return res.status(404).json({ message: 'Registro do paciente não localizado!' });
            }

            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao consultar prontuário: ' + error.message });
        }
    }
};