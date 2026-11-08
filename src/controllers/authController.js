const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

module.exports = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await prisma.usuario.findUnique({ where: { email } });

            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return res.status(401).json({ erro: 'Credenciais inválidas.' });
            }

            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'chave_padrao_desenvolvimento', { expiresIn: '7d' });
            res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro interno ao fazer login.' });
        }
    }
};