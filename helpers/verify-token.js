const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'idr_secret_key_2026');
        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado!' });
    }
};

module.exports = verifyToken;