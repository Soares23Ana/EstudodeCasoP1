const Consulta = require('../models/Consulta');
const Paciente = require('../models/Paciente');

module.exports = class ConsultaController {

    // 1. Agendar nova consulta para o paciente logado
    static async agendar(req, res) {
        const { data, hora, especialidade, observacoes } = req.body;
        const pacienteId = req.paciente.id; // Extraído automaticamente do Token JWT pelo middleware

        if (!data || !hora) {
            return res.status(422).json({ message: 'A data e o horário são obrigatórios!' });
        }

        try {
            const novaConsulta = await Consulta.create({
                data,
                hora,
                especialidade: especialidade || 'Nefrologia',
                observacoes,
                pacienteId
            });

            res.status(201).json({
                message: 'Consulta agendada com sucesso no IDR!',
                consulta: novaConsulta
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao agendar consulta: ' + error.message });
        }
    }

    // 2. Listar todas as consultas do paciente logado
    static async minhasConsultas(req, res) {
        const pacienteId = req.paciente.id;

        try {
            const consultas = await Consulta.findAll({
                where: { pacienteId },
                include: {
                    model: Paciente,
                    attributes: ['nome', 'cpf', 'estagioRenal']
                },
                order: [['data', 'ASC']]
            });

            res.status(200).json(consultas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar consultas: ' + error.message });
        }
    }
};