const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }
    
    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decodificado.id;
        next();
    } catch (erro) {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

module.exports = verificarToken;