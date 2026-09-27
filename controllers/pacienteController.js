const Paciente = require('../models/Paciente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class PacienteController {

    // 1. Cadastro
    static async registrar(req, res) {
        const { nome, cpf, email, senha, estagioRenal } = req.body;

        if (!nome || !cpf || !email || !senha) {
            return res.status(422).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
        }

        try {
            const pacienteExiste = await Paciente.findOne({ where: { cpf } });
            if (pacienteExiste) {
                return res.status(422).json({ message: 'Paciente já cadastrado com este CPF no IDR!' });
            }

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, salt);

            const novoPaciente = await Paciente.create({
                nome,
                cpf,
                email,
                senha: senhaHash,
                estagioRenal: estagioRenal || 'Em Avaliação'
            });

            res.status(201).json({
                message: 'Paciente cadastrado com sucesso no sistema IDR!',
                pacienteId: novoPaciente.id
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno no servidor.', erro: error.message });
        }
    }

    // 2. Login (Gera o Token JWT com a chave do .env)
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ message: 'E-mail e senha são obrigatórios!' });
        }

        const paciente = await Paciente.findOne({ where: { email } });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado no IDR!' });
        }

        const senhaValida = await bcrypt.compare(senha, paciente.senha);
        if (!senhaValida) {
            return res.status(422).json({ message: 'Credenciais inválidas!' });
        }

        const token = jwt.sign(
            { id: paciente.id, nome: paciente.nome },
            process.env.JWT_SECRET, // 👈 Utiliza diretamente a chave secreta do arquivo .env
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Autenticado com sucesso no Portal IDR!',
            token,
            pacienteId: paciente.id
        });
    }

    // 3. Rota Protegida (Perfil do Paciente)
    static async obterPerfil(req, res) {
        try {
            const paciente = await Paciente.findByPk(req.paciente.id, {
                attributes: { exclude: ['senha'] }
            });

            if (!paciente) {
                return res.status(404).json({ message: 'Registro não localizado!' });
            }

            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao consultar perfil: ' + error.message });
        }
    }
};