const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {
        // 🔹 Troque a string secreta antiga por process.env.JWT_SECRET
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.paciente = verificado;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' });
    }
}

module.exports = verificarToken;